// internal/model/user.go
package model

import (
	"time"

	"gorm.io/gorm"
)

type UserList struct {
	Username  string
	Email     string
	GroupName string
	IsAktif   string
	Password  string
}

type UserInput struct {
	Username string `json:"username" validate:"required"`
	Email    string `json:"email" validate:"required,email"`
	Group    int    `json:"group" validate:"required"` 
	IsAktif  string `json:"isAktif" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type FileInput struct {
	FileUpload      string `json:"fileusername" validate:"required"`
	FileDescription string `json:"filedescription" validate:"required"`
}

// Model User
type User struct {
	ID                  uint           `json:"id" gorm:"primaryKey"`
	Username            string         `json:"username" gorm:"uniqueIndex;not null"`
	FirstName           string         `json:"first_name"`
	LastName            string         `json:"last_name"`
	Email               string         `json:"email" gorm:"uniqueIndex;not null"`
	Phone               string         `json:"phone" gorm:"uniqueIndex"`
	Password            string         `json:"-" gorm:"not null"`
	EmailVerified       bool             `json:"email_verified" gorm:"default:false"`
    VerificationToken   string           `json:"-" gorm:"size:255"`
	GroupID             int            `json:"group_id" gorm:"default:1"`
	GroupName           string         `json:"group_name" gorm:"-"`
	Group               Group          `json:"-" gorm:"foreignKey:GroupID"`
	IsAktif             string         `json:"is_aktif" gorm:"default:Y"`
	SubscribeNewsletter bool           `json:"subscribe_newsletter" gorm:"default:false"`
	CreatedAt           time.Time      `json:"created_at"`
	UpdatedAt           time.Time      `json:"updated_at"`
	DeletedAt           gorm.DeletedAt `json:"-" gorm:"index"`
}


type RegisterRequest struct {
	Email           string `json:"email" binding:"required,email"`
	Password        string `json:"password" binding:"required,min=8"`
	ConfirmPassword string `json:"confirmPassword,omitempty"`
}

type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

type LoginWithUsernameRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UserResponse struct {
	ID                  uint      `json:"id"`
	Username            string    `json:"username"`
	FirstName           string    `json:"first_name"`
	LastName            string    `json:"last_name"`
	Email               string    `json:"email"`
	Phone               string    `json:"phone"`
	GroupID             int       `json:"group_id"`
	GroupName           string    `json:"group_name"`
	IsAktif             string    `json:"is_aktif"`
	EmailVerified       bool      `json:"email_verified"`
	PhoneVerified       bool      `json:"phone_verified"`
	SubscribeNewsletter bool      `json:"subscribe_newsletter"`
	CreatedAt           time.Time `json:"created_at"`
}

// Tabel Group
type Group struct {
	ID          int    `json:"id" gorm:"primaryKey"`
	GroupName   string `json:"group_name" gorm:"not null"`
	Description string `json:"description"`
	IsActive    bool   `json:"is_active" gorm:"default:true"`
}

// Converter ke response
func (u *User) ToResponse() UserResponse {
	return UserResponse{
		ID:                  u.ID,
		Username:            u.Username,
		FirstName:           u.FirstName,
		LastName:            u.LastName,
		Email:               u.Email,
		Phone:               u.Phone,
		GroupID:             u.GroupID,
		GroupName:           u.Group.GroupName,
		IsAktif:             u.IsAktif,
		
		SubscribeNewsletter: u.SubscribeNewsletter,
		CreatedAt:           u.CreatedAt,
	}
}

func (u *User) ToUserList() UserList {
	return UserList{
		Username:  u.Username,
		Email:     u.Email,
		GroupName: u.Group.GroupName,
		IsAktif:   u.IsAktif,
		Password:  "",
	}
}

func (ui *UserInput) ToUser() User {
	return User{
		Username: ui.Username,
		Email:    ui.Email,
		GroupID:  ui.Group,
		IsAktif:  ui.IsAktif,
		Password: ui.Password,
	}
}