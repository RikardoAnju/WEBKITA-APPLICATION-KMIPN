package middleware

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"

	"BackendFramework/internal/config"
	"BackendFramework/internal/database"
)

var jwtSecret = []byte(config.JWT_SIGNATURE_KEY)

// Claims structure for JWT Access Token
type AccessClaims struct {
	UserID string `json:"user_id"`
	jwt.RegisteredClaims
}

// GenerateAccessToken generates a new JWT Access token
func GenerateAccessToken(userID string) (string, error) {
	claims := &AccessClaims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(config.AccessTokenExpiry)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "BackendFramework UIB",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

// GenerateRefreshToken generates a new Refresh token
func GenerateRefreshToken() (string, error) {
	bytes := make([]byte, 32)
	_, err := rand.Read(bytes)
	if err != nil {
		return "", err
	}
	plainText := base64.StdEncoding.EncodeToString(bytes)

	key := []byte(config.ENCRYPTION_KEY)
	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, 12)
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}

	aesGCM, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	cipherText := aesGCM.Seal(nonce, nonce, []byte(plainText), nil)
	return base64.StdEncoding.EncodeToString(cipherText), nil
}

// ValidateToken validates the JWT token and returns the claims
func ValidateToken(tokenString string) (*AccessClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &AccessClaims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})
	if err != nil {
		return nil, err
	}

	claims, ok := token.Claims.(*AccessClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	// Cek token di MySQL
	var storedAccessToken string
	var storedIsValid string
	err = database.DbAuth.QueryRow(`
		SELECT access_token, is_valid_token
		FROM access_tokens
		WHERE user_id = ?`, claims.UserID).Scan(&storedAccessToken, &storedIsValid)

	if err != nil || storedAccessToken != tokenString || strings.ToLower(storedIsValid) != "y" {
		return nil, errors.New("token not found or expired")
	}

	return claims, nil
}

// JWTAuthMiddleware is the middleware for token validation
func JWTAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusOK, gin.H{
				"code":  http.StatusUnauthorized,
				"error": "Authorization token not provided",
			})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusOK, gin.H{
				"code":  http.StatusUnauthorized,
				"error": "Invalid token format",
			})
			c.Abort()
			return
		}

		token := parts[1]

		claims, err := ValidateToken(token)
		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"code":  http.StatusUnauthorized,
				"error": "Invalid or expired token",
			})
			c.Abort()
			return
		}

		c.Set("userID", claims.UserID)
		c.Next()
	}
}
