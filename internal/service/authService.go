package service

import (
	"database/sql"
	"errors"
	"time"
	"BackendFramework/internal/database"
	"BackendFramework/internal/model"
	"BackendFramework/internal/utils"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
    db *sql.DB
}

func NewAuthService() *AuthService {
    return &AuthService{
        db: database.DbAuth, 
    }
}

// Register creates a new user account
func (s *AuthService) Register(req model.RegisterRequest) (*model.UserResponse, error) {
	// Check if username already exists
	if err := s.checkUsernameExists(req.Username); err != nil {
		return nil, err
	}

	// Check if email already exists
	if err := s.checkEmailExists(req.Email); err != nil {
		return nil, err
	}

	// Check if phone already exists
	if err := s.checkPhoneExists(req.Phone); err != nil {
		return nil, err
	}

	// Validate group exists
	if err := s.validateGroupExists(req.Group); err != nil {
		return nil, err
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("gagal enkripsi password")
	}

	// Insert user into database
	query := `
		INSERT INTO users (username, first_name, last_name, email, phone, password, group_id, is_aktif, subscribe_newsletter, email_verified, phone_verified, created_at, updated_at) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	
	now := time.Now()
	result, err := s.db.Exec(query, 
		req.Username, 
		req.FirstName, 
		req.LastName, 
		req.Email, 
		req.Phone, 
		string(hashedPassword), 
		req.Group, 
		"Y", 
		req.SubscribeNewsletter, 
		false, 
		false, 
		now, 
		now)
	
	if err != nil {
		return nil, errors.New("gagal membuat akun")
	}

	userID, err := result.LastInsertId()
	if err != nil {
		return nil, errors.New("gagal mendapatkan ID user")
	}

	// Get created user with group info
	user, err := s.getUserByID(uint(userID))
	if err != nil {
		return nil, errors.New("gagal mengambil data user yang baru dibuat")
	}

	response := user.ToResponse()
	return &response, nil
}

// Login authenticates user by email
func (s *AuthService) Login(req model.LoginRequest) (*model.UserResponse, string, error) {
	// Find user by email
	user, err := s.findActiveUserByEmail(req.Email)
	if err != nil {
		return nil, "", err
	}

	// Check password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, "", errors.New("email atau password salah")
	}

	// Generate JWT token
	token, err := utils.GenerateJWT(user.ID, user.Email)
	if err != nil {
		return nil, "", errors.New("gagal membuat token")
	}

	response := user.ToResponse()
	return &response, token, nil
}

// LoginWithUsername authenticates user by username
func (s *AuthService) LoginWithUsername(req model.LoginWithUsernameRequest) (*model.UserResponse, string, error) {
	// Find user by username
	user, err := s.findActiveUserByUsername(req.Username)
	if err != nil {
		return nil, "", err
	}

	// Check password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, "", errors.New("username atau password salah")
	}

	// Generate JWT token
	token, err := utils.GenerateJWT(user.ID, user.Email)
	if err != nil {
		return nil, "", errors.New("gagal membuat token")
	}

	response := user.ToResponse()
	return &response, token, nil
}

// GetUserByID retrieves user by ID
func (s *AuthService) GetUserByID(userID interface{}) (*model.UserResponse, error) {
	user, err := s.getUserByID(userID)
	if err != nil {
		return nil, err
	}

	response := user.ToResponse()
	return &response, nil
}

// GetOneUserByUsername retrieves user by username (for compatibility with existing controller)
func (s *AuthService) GetOneUserByUsername(username string) *model.User {
	user, err := s.findActiveUserByUsername(username)
	if err != nil {
		return nil
	}
	return user
}

// UpsertTokenData creates or updates token data
func (s *AuthService) UpsertTokenData(userID string, tokenData map[string]interface{}) bool {
	// Check if token data exists
	var count int
	checkQuery := "SELECT COUNT(*) FROM user_tokens WHERE user_id = ?"
	err := s.db.QueryRow(checkQuery, userID).Scan(&count)
	if err != nil {
		return false
	}

	now := time.Now()
	
	if count == 0 {
		// Insert new token data
		insertQuery := `
			INSERT INTO user_tokens (user_id, last_ip_address, last_user_agent, access_token, refresh_token, refresh_token_expired, last_login, is_valid_token, is_remember_me, created_at, updated_at) 
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
		
		_, err = s.db.Exec(insertQuery,
			userID,
			tokenData["last_ip_address"],
			tokenData["last_user_agent"],
			tokenData["access_token"],
			tokenData["refresh_token"],
			tokenData["refresh_token_expired"],
			tokenData["last_login"],
			tokenData["is_valid_token"],
			tokenData["is_remember_me"],
			now,
			now)
	} else {
		// Update existing token data
		updateQuery := `
			UPDATE user_tokens 
			SET last_ip_address = ?, last_user_agent = ?, access_token = ?, refresh_token = ?, 
			    refresh_token_expired = ?, last_login = ?, is_valid_token = ?, is_remember_me = ?, updated_at = ?
			WHERE user_id = ?`
		
		_, err = s.db.Exec(updateQuery,
			tokenData["last_ip_address"],
			tokenData["last_user_agent"],
			tokenData["access_token"],
			tokenData["refresh_token"],
			tokenData["refresh_token_expired"],
			tokenData["last_login"],
			tokenData["is_valid_token"],
			tokenData["is_remember_me"],
			now,
			userID)
	}
	
	return err == nil
}

// GetTokenData retrieves token data based on filter
func (s *AuthService) GetTokenData(userID, refreshToken string) map[string]interface{} {
	query := `
		SELECT user_id, last_ip_address, last_user_agent, access_token, refresh_token, 
		       refresh_token_expired, last_login, is_valid_token, is_remember_me, created_at, updated_at
		FROM user_tokens 
		WHERE user_id = ? AND refresh_token = ? AND is_valid_token = 'y'`
	
	var tokenData map[string]interface{}
	var lastIPAddress, lastUserAgent, accessToken, refreshTokenDB, isValidToken, isRememberMe sql.NullString
	var refreshTokenExpired, lastLogin, createdAt, updatedAt sql.NullTime
	var userIDDB string

	err := s.db.QueryRow(query, userID, refreshToken).Scan(
		&userIDDB, &lastIPAddress, &lastUserAgent, &accessToken, &refreshTokenDB,
		&refreshTokenExpired, &lastLogin, &isValidToken, &isRememberMe, &createdAt, &updatedAt)
	
	if err != nil {
		return nil
	}

	tokenData = make(map[string]interface{})
	tokenData["user_id"] = userIDDB
	
	if lastIPAddress.Valid {
		tokenData["last_ip_address"] = lastIPAddress.String
	}
	if lastUserAgent.Valid {
		tokenData["last_user_agent"] = lastUserAgent.String
	}
	if accessToken.Valid {
		tokenData["access_token"] = accessToken.String
	}
	if refreshTokenDB.Valid {
		tokenData["refresh_token"] = refreshTokenDB.String
	}
	if refreshTokenExpired.Valid {
		tokenData["refresh_token_expired"] = refreshTokenExpired.Time
	}
	if lastLogin.Valid {
		tokenData["last_login"] = lastLogin.Time
	}
	if isValidToken.Valid {
		tokenData["is_valid_token"] = isValidToken.String
	}
	if isRememberMe.Valid {
		tokenData["is_remember_me"] = isRememberMe.String
	}
	if createdAt.Valid {
		tokenData["created_at"] = createdAt.Time
	}
	if updatedAt.Valid {
		tokenData["updated_at"] = updatedAt.Time
	}

	return tokenData
}

// DeleteTokenData removes token data for a user
func (s *AuthService) DeleteTokenData(userID string) bool {
	query := "DELETE FROM user_tokens WHERE user_id = ?"
	_, err := s.db.Exec(query, userID)
	return err == nil
}

// TestPing tests database connection
func (s *AuthService) TestPing() error {
	return s.db.Ping()
}

// Helper methods
func (s *AuthService) checkUsernameExists(username string) error {
	var count int
	query := "SELECT COUNT(*) FROM users WHERE username = ?"
	err := s.db.QueryRow(query, username).Scan(&count)
	if err != nil {
		return errors.New("gagal mengecek username")
	}
	if count > 0 {
		return errors.New("username sudah terdaftar")
	}
	return nil
}

func (s *AuthService) checkEmailExists(email string) error {
	var count int
	query := "SELECT COUNT(*) FROM users WHERE email = ?"
	err := s.db.QueryRow(query, email).Scan(&count)
	if err != nil {
		return errors.New("gagal mengecek email")
	}
	if count > 0 {
		return errors.New("email sudah terdaftar")
	}
	return nil
}

func (s *AuthService) checkPhoneExists(phone string) error {
	var count int
	query := "SELECT COUNT(*) FROM users WHERE phone = ?"
	err := s.db.QueryRow(query, phone).Scan(&count)
	if err != nil {
		return errors.New("gagal mengecek nomor telepon")
	}
	if count > 0 {
		return errors.New("nomor telepon sudah terdaftar")
	}
	return nil
}

func (s *AuthService) validateGroupExists(groupID int) error {
	var count int
	query := "SELECT COUNT(*) FROM groups WHERE id = ? AND is_active = true"
	err := s.db.QueryRow(query, groupID).Scan(&count)
	if err != nil {
		return errors.New("gagal validasi grup")
	}
	if count == 0 {
		return errors.New("grup tidak valid")
	}
	return nil
}

func (s *AuthService) findActiveUserByEmail(email string) (*model.User, error) {
	query := `
		SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.phone, u.password, 
		       u.group_id, g.group_name, u.is_aktif, u.email_verified, u.phone_verified, 
		       u.subscribe_newsletter, u.created_at, u.updated_at
		FROM users u
		LEFT JOIN groups g ON u.group_id = g.id
		WHERE u.email = ? AND u.is_aktif = 'Y' AND u.deleted_at IS NULL`
	
	return s.scanUser(query, email)
}

func (s *AuthService) findActiveUserByUsername(username string) (*model.User, error) {
	query := `
		SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.phone, u.password, 
		       u.group_id, g.group_name, u.is_aktif, u.email_verified, u.phone_verified, 
		       u.subscribe_newsletter, u.created_at, u.updated_at
		FROM users u
		LEFT JOIN groups g ON u.group_id = g.id
		WHERE u.username = ? AND u.is_aktif = 'Y' AND u.deleted_at IS NULL`
	
	return s.scanUser(query, username)
}

func (s *AuthService) getUserByID(userID interface{}) (*model.User, error) {
	query := `
		SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.phone, u.password, 
		       u.group_id, g.group_name, u.is_aktif, u.email_verified, u.phone_verified, 
		       u.subscribe_newsletter, u.created_at, u.updated_at
		FROM users u
		LEFT JOIN groups g ON u.group_id = g.id
		WHERE u.id = ? AND u.deleted_at IS NULL`
	
	return s.scanUser(query, userID)
}

func (s *AuthService) scanUser(query string, args ...interface{}) (*model.User, error) {
	var user model.User
	var groupName sql.NullString
	
	err := s.db.QueryRow(query, args...).Scan(
		&user.ID, &user.Username, &user.FirstName, &user.LastName, &user.Email, 
		&user.Phone, &user.Password, &user.GroupID, &groupName, &user.IsAktif, 
		&user.EmailVerified, &user.PhoneVerified, &user.SubscribeNewsletter, 
		&user.CreatedAt, &user.UpdatedAt)
	
	if err == sql.ErrNoRows {
		return nil, errors.New("user tidak ditemukan")
	}
	if err != nil {
		return nil, errors.New("gagal mencari user")
	}

	// Set group name
	if groupName.Valid {
		user.GroupName = groupName.String
		user.Group = model.Group{
			ID:        user.GroupID,
			GroupName: groupName.String,
		}
	}

	return &user, nil
}

// Package-level functions for backward compatibility with existing controller code
var defaultAuthService *AuthService

func init() {
	defaultAuthService = NewAuthService()
}

// GetOneUserByUsername - package level function for backward compatibility
func GetOneUserByUsername(username string) *model.User {
	return defaultAuthService.GetOneUserByUsername(username)
}

// UpsertTokenData - package level function for backward compatibility
func UpsertTokenData(userID string, tokenData map[string]interface{}) bool {
	return defaultAuthService.UpsertTokenData(userID, tokenData)
}

// GetTokenData - package level function for backward compatibility
func GetTokenData(userID, refreshToken string) map[string]interface{} {
	return defaultAuthService.GetTokenData(userID, refreshToken)
}

// DeleteTokenData - package level function for backward compatibility
func DeleteTokenData(userID string) bool {
	return defaultAuthService.DeleteTokenData(userID)
}

// TestPing - package level function for backward compatibility
func TestPing() error {
	return defaultAuthService.TestPing()
}