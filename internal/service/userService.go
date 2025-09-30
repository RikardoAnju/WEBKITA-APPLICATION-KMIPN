package service

import(
	"BackendFramework/internal/model"
	"BackendFramework/internal/database"
	"BackendFramework/internal/middleware"
)

func GetAllUsers() []model.UserList {
	var users []model.UserList
	rows, err := database.DbWebkita.Query("SELECT username, email, `group`, isaktif FROM user")
	if err != nil {
		middleware.LogError(err, "Query Error")
		return nil
	}
	defer rows.Close()

	for rows.Next() {
		var user model.UserList
		err := rows.Scan(&user.Username, &user.Email, &user.GroupName, &user.IsAktif)
		if err != nil {
			middleware.LogError(err, "Data Scan Error")
			return nil
		}
		users = append(users, user)
	}
	return users
}

func GetOneUser(userId string) *model.UserList {
	row := database.DbWebkita.QueryRow("SELECT username, email, `group`, isaktif FROM user WHERE username = ?", userId)
	var user = &model.UserList{}
	err := row.Scan(&user.Username, &user.Email, &user.GroupName, &user.IsAktif)
	if err != nil {
		middleware.LogError(err, "Data Scan Error")
		return nil
	}
	return user
}

func GetOneUserByEmail(userEmail string) *model.UserList {
	row := database.DbWebkita.QueryRow("SELECT username, email, `group`, isaktif FROM user WHERE email = ?", userEmail)
	var user = &model.UserList{}
	err := row.Scan(&user.Username, &user.Email, &user.GroupName, &user.IsAktif)
	if err != nil {
		middleware.LogError(err, "Data Scan Error")
		return nil
	}
	return user
}

func InsertUser(userData *model.UserInput) bool {
	_, err := database.DbWebkita.Exec("INSERT INTO user VALUES (?, ?, ?, ?, ?)",
		userData.Username, userData.Email, userData.Group, userData.IsAktif, userData.Password)
	if err != nil {
		middleware.LogError(err, "Insert Data Failed")
		return false
	}
	return true
}

func UpdateUser(userData *model.UserInput) bool {
	_, err := database.DbWebkita.Exec("UPDATE user SET `group` = ?, isaktif = ?, password = ? WHERE username = ?",
		userData.Group, userData.IsAktif, userData.Password, userData.Username)
	if err != nil {
		middleware.LogError(err, "Update Data Failed")
		return false
	}
	return true
}

func DeleteUser(userId string) bool {
	_, err := database.DbWebkita.Exec("DELETE FROM user WHERE username = ?", userId)
	if err != nil {
		middleware.LogError(err, "Delete Data Failed")
		return false
	}
	return true
}
