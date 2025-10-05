package service

import (
	"BackendFramework/internal/database"
	"BackendFramework/internal/middleware"
	"BackendFramework/internal/model"
	"errors"
	"fmt"
	"gorm.io/gorm"
)

func GetAllUsers() ([]model.UserList, error) {
	var users []model.UserList

	err := database.DbWebkita.
		Table("user as u").
		Select("u.username, u.email, g.group_name, u.is_aktif").
		Joins("LEFT JOIN `group` g ON u.group_id = g.id").
		Where("u.deleted_at IS NULL").
		Scan(&users).Error

	if err != nil {
		middleware.LogError(err, "Query Error: GetAllUsers")
		return nil, fmt.Errorf("failed to query users: %w", err)
	}

	return users, nil
}

// GetOneUser mengambil satu user berdasarkan username
func GetOneUser(userId string) (*model.UserList, error) {
	if userId == "" {
		return nil, errors.New("username cannot be empty")
	}

	var user model.UserList

	err := database.DbWebkita.
		Table("user as u").
		Select("u.username, u.email, g.group_name, u.is_aktif").
		Joins("LEFT JOIN `group` g ON u.group_id = g.id").
		Where("u.username = ? AND u.deleted_at IS NULL", userId).
		Scan(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("user not found: %s", userId)
		}
		middleware.LogError(err, fmt.Sprintf("Data Scan Error: GetOneUser for username %s", userId))
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	// Cek apakah user ditemukan
	if user.Username == "" {
		return nil, fmt.Errorf("user not found: %s", userId)
	}

	return &user, nil
}

// GetOneUserByEmail mengambil satu user berdasarkan email
func GetOneUserByEmail(userEmail string) (*model.UserList, error) {
	if userEmail == "" {
		return nil, errors.New("email cannot be empty")
	}

	var user model.UserList

	err := database.DbWebkita.
		Table("user as u").
		Select("u.username, u.email, g.group_name, u.is_aktif").
		Joins("LEFT JOIN `group` g ON u.group_id = g.id").
		Where("u.email = ? AND u.deleted_at IS NULL", userEmail).
		Scan(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("user not found with email: %s", userEmail)
		}
		middleware.LogError(err, fmt.Sprintf("Data Scan Error: GetOneUserByEmail for email %s", userEmail))
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	// Cek apakah user ditemukan
	if user.Email == "" {
		return nil, fmt.Errorf("user not found with email: %s", userEmail)
	}

	return &user, nil
}

// InsertUser menambahkan user baru
func InsertUser(userData *model.UserInput) error {
	if userData == nil {
		return errors.New("user data cannot be nil")
	}

	// Validasi data input
	if userData.Username == "" {
		return errors.New("username cannot be empty")
	}
	if userData.Email == "" {
		return errors.New("email cannot be empty")
	}

	// Buat map untuk insert
	data := map[string]interface{}{
		"username":   userData.Username,
		"email":      userData.Email,
		"group_id":   userData.Group,
		"is_aktif":   userData.IsAktif,
		"password":   userData.Password,
		"created_at": gorm.Expr("NOW()"),
		"updated_at": gorm.Expr("NOW()"),
	}

	err := database.DbWebkita.Table("user").Create(&data).Error
	if err != nil {
		middleware.LogError(err, "Insert Data Failed: InsertUser")
		return fmt.Errorf("failed to insert user: %w", err)
	}

	return nil
}

// UpdateUser memperbarui data user
func UpdateUser(userData *model.UserInput) error {
	if userData == nil {
		return errors.New("user data cannot be nil")
	}

	if userData.Username == "" {
		return errors.New("username cannot be empty")
	}

	// Buat map untuk update
	updates := map[string]interface{}{
		"group_id":   userData.Group,
		"is_aktif":   userData.IsAktif,
		"updated_at": gorm.Expr("NOW()"),
	}

	// Update password hanya jika tidak kosong
	if userData.Password != "" {
		updates["password"] = userData.Password
	}

	result := database.DbWebkita.
		Table("user").
		Where("username = ? AND deleted_at IS NULL", userData.Username).
		Updates(updates)

	if result.Error != nil {
		middleware.LogError(result.Error, "Update Data Failed: UpdateUser")
		return fmt.Errorf("failed to update user: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return errors.New("user not found or no changes made")
	}

	return nil
}

// DeleteUser menghapus user (soft delete)
func DeleteUser(userId string) error {
	if userId == "" {
		return errors.New("username cannot be empty")
	}

	result := database.DbWebkita.
		Table("user").
		Where("username = ? AND deleted_at IS NULL", userId).
		Update("deleted_at", gorm.Expr("NOW()"))

	if result.Error != nil {
		middleware.LogError(result.Error, "Delete Data Failed: DeleteUser")
		return fmt.Errorf("failed to delete user: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return errors.New("user not found")
	}

	return nil
}

// HardDeleteUser menghapus user secara permanen
func HardDeleteUser(userId string) error {
	if userId == "" {
		return errors.New("username cannot be empty")
	}

	result := database.DbWebkita.
		Table("user").
		Where("username = ?", userId).
		Delete(nil)

	if result.Error != nil {
		middleware.LogError(result.Error, "Hard Delete Data Failed: HardDeleteUser")
		return fmt.Errorf("failed to hard delete user: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return errors.New("user not found")
	}

	return nil
}

// RestoreUser mengembalikan user yang telah di-soft delete
func RestoreUser(userId string) error {
	if userId == "" {
		return errors.New("username cannot be empty")
	}

	result := database.DbWebkita.
		Table("user").
		Where("username = ? AND deleted_at IS NOT NULL", userId).
		Update("deleted_at", nil)

	if result.Error != nil {
		middleware.LogError(result.Error, "Restore Data Failed: RestoreUser")
		return fmt.Errorf("failed to restore user: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return errors.New("user not found or already active")
	}

	return nil
}

// CheckUserExists memeriksa apakah user dengan username atau email sudah ada
func CheckUserExists(username, email string) (bool, error) {
	var count int64

	err := database.DbWebkita.
		Table("user").
		Where("(username = ? OR email = ?) AND deleted_at IS NULL", username, email).
		Count(&count).Error

	if err != nil {
		middleware.LogError(err, "Check User Exists Failed")
		return false, fmt.Errorf("failed to check user existence: %w", err)
	}

	return count > 0, nil
}

// GetUserWithPassword mengambil user beserta password (untuk autentikasi)
func GetUserWithPassword(username string) (*model.User, error) {
	if username == "" {
		return nil, errors.New("username cannot be empty")
	}

	var user model.User

	err := database.DbWebkita.
		Table("user").
		Where("username = ? AND deleted_at IS NULL", username).
		First(&user).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, fmt.Errorf("user not found: %s", username)
		}
		middleware.LogError(err, fmt.Sprintf("Get User with Password Failed for username %s", username))
		return nil, fmt.Errorf("failed to get user: %w", err)
	}

	return &user, nil
}

// UpdateUserPassword memperbarui password user
func UpdateUserPassword(username, newPassword string) error {
	if username == "" {
		return errors.New("username cannot be empty")
	}
	if newPassword == "" {
		return errors.New("new password cannot be empty")
	}

	result := database.DbWebkita.
		Table("user").
		Where("username = ? AND deleted_at IS NULL", username).
		Updates(map[string]interface{}{
			"password":   newPassword,
			"updated_at": gorm.Expr("NOW()"),
		})

	if result.Error != nil {
		middleware.LogError(result.Error, "Update Password Failed: UpdateUserPassword")
		return fmt.Errorf("failed to update password: %w", result.Error)
	}

	if result.RowsAffected == 0 {
		return errors.New("user not found")
	}

	return nil
}