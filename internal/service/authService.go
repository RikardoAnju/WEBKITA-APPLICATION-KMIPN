package service

import (
	"database/sql"
	"errors"
	"log"
	"strings"
	"time"

	"BackendFramework/internal/database"
	"BackendFramework/internal/model"
	"BackendFramework/internal/utils"

	"golang.org/x/crypto/bcrypt"
)

// Mapping Grup ID (Hanya Admin=1 dan User=2)
const (
	GroupIDAdmin = 1
	GroupIDUser  = 2
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

func (s *AuthService) Register(req model.RegisterRequest) (*model.UserResponse, error) {
	// Validasi username
	if req.Username == "" {
		return nil, errors.New("username wajib diisi")
	}

	// Validasi panjang username
	if len(req.Username) < 3 {
		return nil, errors.New("username minimal 3 karakter")
	}

	if err := s.cekUsernameAda(req.Username); err != nil {
		return nil, err
	}

	// Validasi email
	if req.Email == "" {
		return nil, errors.New("email wajib diisi")
	}

	// Validasi format email
	if !s.isValidEmail(req.Email) {
		return nil, errors.New("format email tidak valid")
	}

	if err := s.cekEmailAda(req.Email); err != nil {
		return nil, err
	}

	// Validasi phone (jika diisi)
	if req.Phone != "" {
		if err := s.cekTeleponAda(req.Phone); err != nil {
			return nil, err
		}
	}

	// Validasi password
	if req.Password == "" {
		return nil, errors.New("password wajib diisi")
	}
	if len(req.Password) < 8 {
		return nil, errors.New("password minimal 8 karakter")
	}

	// Validasi confirmPassword
	if req.ConfirmPassword == "" {
		return nil, errors.New("konfirmasi password wajib diisi")
	}
	if req.Password != req.ConfirmPassword {
		return nil, errors.New("password dan konfirmasi password tidak sama")
	}

	// Set default GroupID jika tidak diisi atau 0
	if req.GroupID == 0 {
		req.GroupID = GroupIDUser
	}
	if req.IsAktif == "" {
		req.IsAktif = "Y"
	}

	// Validasi group_id
	if !s.isValidGroupID(req.GroupID) {
		return nil, errors.New("ID grup tidak valid (harus 1 atau 2)")
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		return nil, errors.New("gagal mengenkripsi kata sandi")
	}

	now := time.Now()

	query := `INSERT INTO users (username, email, password, group_id, is_aktif, first_name, last_name, phone, subscribe_newsletter, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	result, err := s.db.Exec(query,
		req.Username,
		req.Email,
		string(hashedPassword),
		req.GroupID,
		req.IsAktif,
		req.FirstName,
		req.LastName,
		req.Phone,
		req.SubscribeNewsletter,
		now,
		now,
	)
	if err != nil {
		log.Printf("Error executing insert query: %v", err)
		return nil, errors.New("gagal membuat akun pengguna")
	}

	userID, err := result.LastInsertId()
	if err != nil {
		log.Printf("Error getting last insert ID: %v", err)
		return nil, errors.New("gagal mendapatkan ID pengguna baru")
	}

	// Ambil data user yang baru dibuat
	user, err := s.getUserBerdasarkanID(uint(userID))
	if err != nil {
		log.Printf("Error getting user by ID: %v", err)
		return nil, errors.New("gagal mengambil data pengguna")
	}

	response := user.ToResponse()
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

	// Generate token JWT
	token, err := utils.GenerateJWT(user.ID, user.Email)
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
		log.Printf("Error checking token data: %v", err)
		return false
	}

	now := time.Now()
	if count == 0 {
		// Sisipkan data token baru
		insertQuery := `INSERT INTO user_tokens (user_id, last_ip_address, last_user_agent, access_token, refresh_token, refresh_token_expired, last_login, is_valid_token, is_remember_me, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
		updateQuery := `UPDATE user_tokens SET last_ip_address = ?, last_user_agent = ?, access_token = ?, refresh_token = ?, refresh_token_expired = ?, last_login = ?, is_valid_token = ?, is_remember_me = ?, updated_at = ? WHERE user_id = ?`
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

	if err != nil {
		log.Printf("Error upserting token data: %v", err)
		return false
	}

	return true
}

// GetTokenData mengambil data token berdasarkan ID pengguna dan refresh token.
func (s *AuthService) GetTokenData(userID, refreshToken string) map[string]interface{} {
	query := `SELECT user_id, last_ip_address, last_user_agent, access_token, refresh_token, refresh_token_expired, last_login, is_valid_token, is_remember_me, created_at, updated_at FROM user_tokens WHERE user_id = ? AND refresh_token = ? AND is_valid_token = 'Y'`

	var tokenData map[string]interface{}
	var lastIPAddress, lastUserAgent, accessToken, refreshTokenDB, isValidToken, isRememberMe sql.NullString
	var refreshTokenExpired, lastLogin, createdAt, updatedAt sql.NullTime
	var userIDDB string

	err := s.db.QueryRow(query, userID, refreshToken).Scan(
		&userIDDB, &lastIPAddress, &lastUserAgent, &accessToken, &refreshTokenDB,
		&refreshTokenExpired, &lastLogin, &isValidToken, &isRememberMe, &createdAt, &updatedAt)

	if err != nil {
		if err != sql.ErrNoRows {
			log.Printf("Error getting token data: %v", err)
		}
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
	if err != nil {
		log.Printf("Error deleting token data: %v", err)
		return false
	}
	return true
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
	query := "SELECT COUNT(*) FROM users WHERE username = ? AND deleted_at IS NULL"
	err := s.db.QueryRow(query, username).Scan(&count)
	if err != nil {
		log.Printf("Error checking username: %v", err)
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
	query := "SELECT COUNT(*) FROM users WHERE email = ? AND deleted_at IS NULL"
	err := s.db.QueryRow(query, email).Scan(&count)
	if err != nil {
		log.Printf("Error checking email: %v", err)
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
	query := "SELECT COUNT(*) FROM users WHERE phone = ? AND deleted_at IS NULL"
	err := s.db.QueryRow(query, phone).Scan(&count)
	if err != nil {
		log.Printf("Error checking phone: %v", err)
		return errors.New("gagal mengecek ketersediaan nomor telepon")
	}
	if count > 0 {
		return errors.New("nomor telepon sudah terdaftar")
	}
	return nil
}

// isValidGroupID memeriksa apakah GroupID valid (hanya 1 atau 2).
func (s *AuthService) isValidGroupID(groupID uint) bool {
	return groupID == GroupIDAdmin || groupID == GroupIDUser
}

// isValidEmail memeriksa apakah format email valid
func (s *AuthService) isValidEmail(email string) bool {
	// Validasi sederhana format email
	email = strings.TrimSpace(email)
	if email == "" {
		return false
	}

	// Harus mengandung @ dan .
	atIndex := strings.Index(email, "@")
	if atIndex == -1 || atIndex == 0 || atIndex == len(email)-1 {
		return false
	}

	dotIndex := strings.LastIndex(email, ".")
	if dotIndex == -1 || dotIndex < atIndex || dotIndex == len(email)-1 {
		return false
	}

	return true
}

// cariUserAktifBerdasarkanEmail mencari pengguna yang aktif berdasarkan email.
func (s *AuthService) cariUserAktifBerdasarkanEmail(email string) (*model.User, error) {
	query := `SELECT id, username, first_name, last_name, email, phone, password, group_id, is_aktif, subscribe_newsletter, created_at, updated_at FROM users WHERE email = ? AND is_aktif = 'Y' AND deleted_at IS NULL`
	return s.pindaiUser(query, email)
}

func (s *AuthService) cariUserAktifBerdasarkanUsername(username string) (*model.User, error) {
	query := `SELECT id, username, first_name, last_name, email, phone, password, group_id, is_aktif, subscribe_newsletter, created_at, updated_at FROM users WHERE username = ? AND is_aktif = 'Y' AND deleted_at IS NULL`
	return s.pindaiUser(query, username)
}

// getUserBerdasarkanID mengambil pengguna berdasarkan ID
func (s *AuthService) getUserBerdasarkanID(userID interface{}) (*model.User, error) {
	query := `SELECT id, username, first_name, last_name, email, phone, password, group_id, is_aktif, subscribe_newsletter, created_at, updated_at FROM users WHERE id = ? AND deleted_at IS NULL`
	return s.pindaiUser(query, userID)
}

// pindaiUser digunakan untuk memindai hasil query pengguna.
// FIX: Tangani timestamps yang mungkin dalam format string dari database
func (s *AuthService) pindaiUser(query string, args ...interface{}) (*model.User, error) {
	var user model.User
	var firstName, lastName, phone sql.NullString
	var groupID uint
	var subscribeNewsletter bool

	// ✅ PERBAIKAN: Scan sebagai string terlebih dahulu (karena database mengembalikan bytes)
	var createdAtStr, updatedAtStr sql.NullString

	err := s.db.QueryRow(query, args...).Scan(
		&user.ID,
		&user.Username,
		&firstName,
		&lastName,
		&user.Email,
		&phone,
		&user.Password,
		&groupID,
		&user.IsAktif,
		&subscribeNewsletter,
		&createdAtStr,
		&updatedAtStr,
	)

	if err == sql.ErrNoRows {
		return nil, errors.New("pengguna tidak ditemukan")
	}
	if err != nil {
		log.Printf("Error scanning user: %v", err)
		return nil, errors.New("gagal memuat data pengguna")
	}

	user.GroupID = groupID

	// Set nullable fields
	if firstName.Valid {
		user.FirstName = firstName.String
	}
	if lastName.Valid {
		user.LastName = lastName.String
	}
	if phone.Valid {
		user.Phone = phone.String
	}

	user.SubscribeNewsletter = subscribeNewsletter

	// ✅ PERBAIKAN: Parse string timestamp ke time.Time
	if createdAtStr.Valid && createdAtStr.String != "" {
		parsedTime, err := parseTime(createdAtStr.String)
		if err == nil {
			user.CreatedAt = &parsedTime
		} else {
			log.Printf("Error parsing created_at: %v", err)
		}
	}

	if updatedAtStr.Valid && updatedAtStr.String != "" {
		parsedTime, err := parseTime(updatedAtStr.String)
		if err == nil {
			user.UpdatedAt = &parsedTime
		} else {
			log.Printf("Error parsing updated_at: %v", err)
		}
	}

	return &user, nil
}

// parseTime mengparse timestamp dalam berbagai format yang mungkin dari database
func parseTime(timeStr string) (time.Time, error) {
	// Coba berbagai format timestamp yang umum
	formats := []string{
		"2006-01-02 15:04:05",           // MySQL default format
		"2006-01-02T15:04:05Z07:00",     // RFC3339
		"2006-01-02T15:04:05",           // ISO format tanpa timezone
		"2006-01-02 15:04:05.000000",    // MySQL dengan microseconds
		time.RFC3339,
		time.RFC3339Nano,
	}

	for _, format := range formats {
		if parsedTime, err := time.Parse(format, timeStr); err == nil {
			return parsedTime, nil
		}
	}

	return time.Time{}, errors.New("format timestamp tidak dikenali: " + timeStr)
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