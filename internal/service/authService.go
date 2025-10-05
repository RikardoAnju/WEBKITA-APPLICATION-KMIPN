package service

import (
	"database/sql"
	"errors"
	"time"
	"BackendFramework/internal/database"
	"BackendFramework/internal/model"
	"BackendFramework/internal/utils"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/gomail.v2"
)

// AuthService adalah struktur layanan untuk menangani logika otentikasi.
type AuthService struct {
	db *sql.DB
}

// NewAuthService membuat instance baru dari AuthService.
func NewAuthService() *AuthService {
	return &AuthService{
		db: database.DbAuth, 
	}
}


func (s *AuthService) VerifyEmail(token string) error {
	query := "UPDATE users SET email_verified = true, verification_token = '' WHERE verification_token = ?"
	result, err := s.db.Exec(query, token)
	if err != nil {
		return errors.New("gagal melakukan verifikasi email di database")
	}

	rows, _ := result.RowsAffected()
	if rows == 0 {
		return errors.New("token tidak valid atau sudah dipakai")
	}
	return nil
}

func SendVerificationEmail(to, token string) error {
    cfg := utils.LoadSMTPConfig() 

    m := gomail.NewMessage()
    m.SetHeader("From", cfg.SenderName)
    m.SetHeader("To", to)
    m.SetHeader("Subject", "Verifikasi Email Anda")

    verifyURL := "http://localhost:8080/verify?token=" + token
    m.SetBody("text/html", "Klik tautan berikut untuk verifikasi akun Anda: <a href='"+verifyURL+"'>Verifikasi Akun</a>")

    d := gomail.NewDialer(cfg.Host, 587, cfg.AuthEmail, cfg.AuthPass)
    return d.DialAndSend(m)
}



func generateVerificationToken() string {
	return uuid.New().String()
}



// Register mendaftarkan pengguna baru ke database.
func (s *AuthService) Register(req model.RegisterRequest) (*model.UserResponse, error) {
	// Cek apakah email sudah terdaftar
	if err := s.cekEmailAda(req.Email); err != nil {
		return nil, err
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("gagal mengenkripsi kata sandi")
	}

	// Generate token verifikasi
	token := generateVerificationToken()

	now := time.Now()

	query := `
		INSERT INTO users (username, email, password, group_id, is_aktif, subscribe_newsletter, 
						   email_verified, verification_token, created_at, updated_at) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

	result, err := s.db.Exec(query,
		req.Email,             
		req.Email,
		string(hashedPassword),
		1,     
		"Y",   
		false, 
		false, 
		token, 
		now,
		now,
	)
	if err != nil {
		return nil, errors.New("gagal membuat akun pengguna")
	}

	userID, _ := result.LastInsertId()

	// Kirim email verifikasi secara asynchronous
	go SendVerificationEmail(req.Email, token)

	user, _ := s.getUserBerdasarkanID(uint(userID))
	response := user.ToResponse() // Asumsi ToResponse() ada di model.User
	return &response, nil
}

// Login mengotentikasi pengguna berdasarkan email.
func (s *AuthService) Login(req model.LoginRequest) (*model.UserResponse, string, error) {
	// Cari pengguna aktif berdasarkan email
	user, err := s.cariUserAktifBerdasarkanEmail(req.Email)
	if err != nil {
		return nil, "", err
	}

	// Periksa password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, "", errors.New("email atau kata sandi salah")
	}

	// Cek apakah email sudah diverifikasi
	if !user.EmailVerified {
		return nil, "", errors.New("akun belum diverifikasi. Silakan cek email Anda untuk tautan verifikasi")
	}

	// Generate token JWT
	token, err := utils.GenerateJWT(user.ID, user.Email) // Asumsi GenerateJWT ada di package utils
	if err != nil {
		return nil, "", errors.New("gagal membuat token otentikasi")
	}

	response := user.ToResponse()
	return &response, token, nil
}

// LoginWithUsername mengotentikasi pengguna berdasarkan username.
func (s *AuthService) LoginWithUsername(req model.LoginWithUsernameRequest) (*model.UserResponse, string, error) {
	// Cari pengguna aktif berdasarkan username
	user, err := s.cariUserAktifBerdasarkanUsername(req.Username)
	if err != nil {
		return nil, "", err
	}

	// Periksa password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, "", errors.New("username atau kata sandi salah")
	}

	// Cek apakah email sudah diverifikasi
	if !user.EmailVerified {
		return nil, "", errors.New("akun belum diverifikasi. Silakan cek email Anda untuk tautan verifikasi")
	}

	// Generate token JWT
	token, err := utils.GenerateJWT(user.ID, user.Email)
	if err != nil {
		return nil, "", errors.New("gagal membuat token otentikasi")
	}

	response := user.ToResponse()
	return &response, token, nil
}

// GetUserByID mengambil data pengguna berdasarkan ID.
func (s *AuthService) GetUserByID(userID interface{}) (*model.UserResponse, error) {
	user, err := s.getUserBerdasarkanID(userID)
	if err != nil {
		return nil, err
	}

	response := user.ToResponse()
	return &response, nil
}

// GetOneUserByUsername mengambil data pengguna berdasarkan username (untuk kompatibilitas controller lama).
func (s *AuthService) GetOneUserByUsername(username string) *model.User {
	user, err := s.cariUserAktifBerdasarkanUsername(username)
	if err != nil {
		return nil
	}
	return user
}

// UpsertTokenData membuat atau memperbarui data token pengguna di tabel user_tokens.
func (s *AuthService) UpsertTokenData(userID string, tokenData map[string]interface{}) bool {
	// Periksa apakah data token sudah ada untuk pengguna ini
	var count int
	checkQuery := "SELECT COUNT(*) FROM user_tokens WHERE user_id = ?"
	err := s.db.QueryRow(checkQuery, userID).Scan(&count)
	if err != nil {
		return false
	}

	now := time.Now()

	if count == 0 {
		// Sisipkan data token baru
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
		// Perbarui data token yang sudah ada
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

// GetTokenData mengambil data token berdasarkan ID pengguna dan refresh token.
func (s *AuthService) GetTokenData(userID, refreshToken string) map[string]interface{} {
	query := `
		SELECT user_id, last_ip_address, last_user_agent, access_token, refresh_token, 
			   refresh_token_expired, last_login, is_valid_token, is_remember_me, created_at, updated_at
		FROM user_tokens 
		WHERE user_id = ? AND refresh_token = ? AND is_valid_token = 'Y'` 

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

// DeleteTokenData menghapus data token untuk seorang pengguna.
func (s *AuthService) DeleteTokenData(userID string) bool {
	query := "DELETE FROM user_tokens WHERE user_id = ?"
	_, err := s.db.Exec(query, userID)
	return err == nil
}

// TestPing menguji koneksi ke database.
func (s *AuthService) TestPing() error {
	return s.db.Ping()
}

// =========================================================================
// FUNGSI PEMBANTU (HELPERS)
// =========================================================================

// cekUsernameAda memeriksa apakah username sudah terdaftar.
func (s *AuthService) cekUsernameAda(username string) error {
	var count int
	query := "SELECT COUNT(*) FROM users WHERE username = ?"
	err := s.db.QueryRow(query, username).Scan(&count)
	if err != nil {
		return errors.New("gagal mengecek ketersediaan username")
	}
	if count > 0 {
		return errors.New("username sudah terdaftar")
	}
	return nil
}

// cekEmailAda memeriksa apakah email sudah terdaftar.
func (s *AuthService) cekEmailAda(email string) error {
	var count int
	query := "SELECT COUNT(*) FROM users WHERE email = ?"
	err := s.db.QueryRow(query, email).Scan(&count)
	if err != nil {
		return errors.New("gagal mengecek ketersediaan email")
	}
	if count > 0 {
		return errors.New("email sudah terdaftar")
	}
	return nil
}

// cekTeleponAda memeriksa apakah nomor telepon sudah terdaftar.
func (s *AuthService) cekTeleponAda(phone string) error {
	var count int
	query := "SELECT COUNT(*) FROM users WHERE phone = ?"
	err := s.db.QueryRow(query, phone).Scan(&count)
	if err != nil {
		return errors.New("gagal mengecek ketersediaan nomor telepon")
	}
	if count > 0 {
		return errors.New("nomor telepon sudah terdaftar")
	}
	return nil
}

// validasiGrupAda memeriksa apakah group_id valid dan aktif.
func (s *AuthService) validasiGrupAda(groupID int) error {
	var count int
	query := "SELECT COUNT(*) FROM groups WHERE id = ? AND is_active = true"
	err := s.db.QueryRow(query, groupID).Scan(&count)
	if err != nil {
		return errors.New("gagal validasi grup")
	}
	if count == 0 {
		return errors.New("grup tidak valid atau tidak aktif")
	}
	return nil
}

// cariUserAktifBerdasarkanEmail mencari pengguna yang aktif berdasarkan email.
func (s *AuthService) cariUserAktifBerdasarkanEmail(email string) (*model.User, error) {
	query := `
		SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.phone, u.password, 
			   u.group_id, g.group_name, u.is_aktif, u.email_verified, u.phone_verified, 
			   u.subscribe_newsletter, u.created_at, u.updated_at
		FROM users u
		LEFT JOIN groups g ON u.group_id = g.id
		WHERE u.email = ? AND u.is_aktif = 'Y' AND u.deleted_at IS NULL`

	return s.pindaiUser(query, email)
}

// cariUserAktifBerdasarkanUsername mencari pengguna yang aktif berdasarkan username.
func (s *AuthService) cariUserAktifBerdasarkanUsername(username string) (*model.User, error) {
	query := `
		SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.phone, u.password, 
			   u.group_id, g.group_name, u.is_aktif, u.email_verified, u.phone_verified, 
			   u.subscribe_newsletter, u.created_at, u.updated_at
		FROM users u
		LEFT JOIN groups g ON u.group_id = g.id
		WHERE u.username = ? AND u.is_aktif = 'Y' AND u.deleted_at IS NULL`

	return s.pindaiUser(query, username)
}

// getUserBerdasarkanID mengambil pengguna berdasarkan ID
func (s *AuthService) getUserBerdasarkanID(userID interface{}) (*model.User, error) {
	query := `
		SELECT u.id, u.username, u.first_name, u.last_name, u.email, u.phone, u.password, 
			   u.group_id, g.group_name, u.is_aktif, u.email_verified, u.phone_verified, 
			   u.subscribe_newsletter, u.created_at, u.updated_at
		FROM users u
		LEFT JOIN groups g ON u.group_id = g.id
		WHERE u.id = ? AND u.deleted_at IS NULL`

	return s.pindaiUser(query, userID)
}

func (s *AuthService) pindaiUser(query string, args ...interface{}) (*model.User, error) {
	var user model.User
	var groupName sql.NullString
	var emailVerified, phoneVerified, subscribeNewsletter bool

	err := s.db.QueryRow(query, args...).Scan(
		&user.ID, &user.Username, &user.FirstName, &user.LastName, &user.Email,
		&user.Phone, &user.Password, &user.GroupID, &groupName, &user.IsAktif,
		&emailVerified, &phoneVerified, &subscribeNewsletter, 
		&user.CreatedAt, &user.UpdatedAt)

	if err == sql.ErrNoRows {
		return nil, errors.New("pengguna tidak ditemukan")
	}
	if err != nil {
		// Sebaiknya lakukan logging error di sini
		return nil, errors.New("gagal memuat data pengguna")
	}

	
	user.EmailVerified = emailVerified
	user.SubscribeNewsletter = subscribeNewsletter

	// Set nama grup
	if groupName.Valid {
		user.GroupName = groupName.String
		user.Group = model.Group{
			ID:        user.GroupID,
			GroupName: groupName.String,
		}
	}

	return &user, nil
}

// =========================================================================
// FUNGSI LEVEL PACKAGE (KOMPATIBILITAS MUNDUR)
// =========================================================================

var defaultAuthService *AuthService

func init() {
	defaultAuthService = NewAuthService()
}

// GetOneUserByUsername - fungsi level package untuk kompatibilitas mundur.
func GetOneUserByUsername(username string) *model.User {
	return defaultAuthService.GetOneUserByUsername(username)
}

// UpsertTokenData - fungsi level package untuk kompatibilitas mundur.
func UpsertTokenData(userID string, tokenData map[string]interface{}) bool {
	return defaultAuthService.UpsertTokenData(userID, tokenData)
}

// GetTokenData - fungsi level package untuk kompatibilitas mundur.
func GetTokenData(userID, refreshToken string) map[string]interface{} {
	return defaultAuthService.GetTokenData(userID, refreshToken)
}

// DeleteTokenData - fungsi level package untuk kompatibilitas mundur.
func DeleteTokenData(userID string) bool {
	return defaultAuthService.DeleteTokenData(userID)
}

// TestPing - fungsi level package untuk kompatibilitas mundur.
func TestPing() error {
	return defaultAuthService.TestPing()
}
