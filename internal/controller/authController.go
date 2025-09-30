package controller

import(
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-ldap/ldap/v3"

	"BackendFramework/internal/config"
	"BackendFramework/internal/middleware"
	"BackendFramework/internal/service"
	"BackendFramework/internal/model"
)

type AuthController struct {
	authService *service.AuthService
}

func NewAuthController() *AuthController {
	return &AuthController{
		authService: service.NewAuthService(),
	}
}

// Register handles user registration
func (ctrl *AuthController) Register(c *gin.Context) {
	var req model.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    http.StatusBadRequest,
			"error":   "Invalid request format",
			"message": err.Error(),
		})
		return
	}

	user, err := ctrl.authService.Register(req)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    http.StatusBadRequest,
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "User registered successfully",
		"data":    user,
	})
}

// LoginWithEmail handles email-based login
func (ctrl *AuthController) LoginWithEmail(c *gin.Context) {
	var req model.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    http.StatusBadRequest,
			"error":   "Invalid request format",
			"message": err.Error(),
		})
		return
	}

	user, token, err := ctrl.authService.Login(req)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":  http.StatusUnauthorized,
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":        http.StatusOK,
		"message":     "Login successful",
		"user":        user,
		"accessToken": token,
	})
}

// LoginWithUsername handles username-based login
func (ctrl *AuthController) LoginWithUsername(c *gin.Context) {
	var req model.LoginWithUsernameRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":    http.StatusBadRequest,
			"error":   "Invalid request format",
			"message": err.Error(),
		})
		return
	}

	user, token, err := ctrl.authService.LoginWithUsername(req)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":  http.StatusUnauthorized,
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":        http.StatusOK,
		"message":     "Login successful",
		"user":        user,
		"accessToken": token,
	})
}

// Login handles LDAP-based login (legacy compatibility)
func Login(c *gin.Context) {
	var loginBody struct {
		Email      string `json:"email" binding:"required"`
		Password   string `json:"password" binding:"required"`
		RememberMe string `json:"remember_me"`
	}
	
	if err := c.ShouldBindJSON(&loginBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":  http.StatusBadRequest,
			"error": "Invalid request format",
		})
		return
	}
	
	// LDAP Authentication
	ldapValid, err := ldapAuth(loginBody.Email, loginBody.Password)
	if !ldapValid {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":  http.StatusUnauthorized,
			"error": "LDAP verification failed",
		})
		return
	}
	
	// Get user from database
	user := service.GetOneUserByUsername(loginBody.Email)
	if user == nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":  http.StatusUnauthorized,
			"error": "User not found",
		})
		return
	}

	// Generate tokens
	accessToken, err := middleware.GenerateAccessToken(user.Username)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":  http.StatusInternalServerError,
			"error": "Failed to generate access token: " + err.Error(),
		})
		return
	}
	
	refreshToken, err := middleware.GenerateRefreshToken()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":  http.StatusInternalServerError,
			"error": "Failed to generate refresh token: " + err.Error(),
		})
		return
	}
	
	// Save token data
	tokenData := map[string]interface{}{
		"last_ip_address":         c.ClientIP(),
		"last_user_agent":         c.GetHeader("User-Agent"),
		"access_token":            accessToken,
		"refresh_token":           refreshToken,
		"refresh_token_expired":   time.Now().Add(config.RefreshTokenExpiry),
		"last_login":              time.Now(),
		"is_valid_token":          "y",
		"is_remember_me":          loginBody.RememberMe,
	}
	
	if !service.UpsertTokenData(user.Username, tokenData) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":  http.StatusInternalServerError,
			"error": "Failed to save token to database",
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"code":         http.StatusOK,
		"message":      "Login successful",
		"userId":       user.Username,
		"accessToken":  accessToken,
		"refreshToken": refreshToken,
	})
}

// Logout handles user logout
func Logout(c *gin.Context) {
	userID := c.Param("usrId")
	if userID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":  http.StatusBadRequest,
			"error": "User ID not provided",
		})
		return
	}
	
	if !service.DeleteTokenData(userID) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":  http.StatusInternalServerError,
			"error": "Failed to logout user",
		})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "User logged out successfully",
	})
}

// RefreshAccessToken handles token refresh
func RefreshAccessToken(c *gin.Context) {
	var refreshRequest struct {
		RefreshToken string `json:"refresh_token" binding:"required"`
		UserID       string `json:"user_id" binding:"required"`
	}
	
	if err := c.ShouldBindJSON(&refreshRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"code":  http.StatusBadRequest,
			"error": "Please provide refresh token and user ID",
		})
		return
	}
	
	// Get stored token data
	storedToken := service.GetTokenData(refreshRequest.UserID, refreshRequest.RefreshToken)
	
	if storedToken == nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":  http.StatusUnauthorized,
			"error": "Invalid refresh token",
		})
		return
	}
	
	// Extract values from map
	userID, ok := storedToken["user_id"].(string)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":  http.StatusInternalServerError,
			"error": "Invalid token data format",
		})
		return
	}
	
	// Check if refresh token is expired
	extendRefresh := false
	if refreshTokenExpired, ok := storedToken["refresh_token_expired"].(time.Time); ok {
		if time.Now().After(refreshTokenExpired) {
			isRememberMe, _ := storedToken["is_remember_me"].(string)
			if isRememberMe != "y" {
				c.JSON(http.StatusUnauthorized, gin.H{
					"code":  http.StatusUnauthorized,
					"error": "Refresh token expired",
				})
				return
			}
			extendRefresh = true
		}
	}
	
	// Generate new access token
	newAccessToken, err := middleware.GenerateAccessToken(userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":  http.StatusInternalServerError,
			"error": "Failed to generate new access token",
		})
		return
	}

	// Prepare update data
	updateData := map[string]interface{}{
		"access_token": newAccessToken,
	}
	
	// Extend refresh token if remember me is enabled
	if extendRefresh {
		updateData["refresh_token_expired"] = time.Now().Add(config.RefreshTokenExpiry)
	}

	// Update token data in database
	if !service.UpsertTokenData(userID, updateData) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"code":  http.StatusInternalServerError,
			"error": "Failed to update token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":         http.StatusOK,
		"message":      "Token refreshed successfully",
		"access_token": newAccessToken,
	})
}

// GetProfile handles getting user profile
func (ctrl *AuthController) GetProfile(c *gin.Context) {
	userID := c.GetString("user_id") // assuming this comes from JWT middleware
	if userID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"code":  http.StatusUnauthorized,
			"error": "User not authenticated",
		})
		return
	}

	user, err := ctrl.authService.GetUserByID(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"code":  http.StatusNotFound,
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"code":    http.StatusOK,
		"message": "User profile retrieved successfully",
		"data":    user,
	})
}

// ldapAuth performs LDAP authentication
func ldapAuth(username, password string) (bool, error) {
	l, err := ldap.Dial("tcp", fmt.Sprintf("%s:%d", config.LDAP_SERVER, config.LDAP_PORT))
	if err != nil {
		middleware.LogError(err, "Failed to dial to LDAP server")
		return false, err
	}
	defer l.Close()

	err = l.Bind(username, password)
	if err != nil {
		return false, err
	}
	
	return true, nil
}