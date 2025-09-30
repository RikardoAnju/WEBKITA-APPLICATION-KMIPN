package controller

import(
	"net/http"

	"github.com/gin-gonic/gin"

	"BackendFramework/internal/model"
	"BackendFramework/internal/service"
)


func GetUser(c *gin.Context) {
	usrId := c.Param("usrId")
	if usrId != "" {
		user := service.GetOneUser(usrId)
		if user == nil {
			c.JSON(http.StatusOK, gin.H{
				"code" : http.StatusInternalServerError,
				"error": "Error detected Check error Log",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"code" : http.StatusOK,
			"user_data":user,
		})
	}else {
		users := service.GetAllUsers()
		if users == nil {
			c.JSON(http.StatusOK, gin.H{
				"code" : http.StatusInternalServerError,
				"error": "Error detected Check error Log",
			})
			return
		}
		c.JSON(http.StatusOK, gin.H{
			"code" : http.StatusOK,
			"user_data":users,
		})
	}
}

func InsertUser(c * gin.Context) {
	validatedInput, _ := c.Get("validatedInput")
	userInput := validatedInput.(*model.UserInput)

	status := service.InsertUser(userInput)

	if status == false {
		response := gin.H{
			"code":http.StatusInternalServerError,
			"message": "Insert user Failed",
			"user":    userInput,
		}
		c.JSON(http.StatusOK, response)
		return
	}
	response := gin.H{
		"code":http.StatusOK,
		"message": "User created successfully",
		"user":    userInput,
	}
	c.JSON(http.StatusOK, response)
}

func UpdatetUser(c * gin.Context) {
	validatedInput, _ := c.Get("validatedInput")
	userInput := validatedInput.(*model.UserInput)

	status := service.UpdateUser(userInput)

	if status == false {
		response := gin.H{
			"code":http.StatusInternalServerError,
			"message": "Update user Failed",
			"user":    userInput,
		}
		c.JSON(http.StatusOK, response)
		return
	}
	response := gin.H{
		"code":http.StatusOK,
		"message": "User Updated successfully",
		"user":    userInput,
	}
	c.JSON(http.StatusOK, response)
}

func DeleteUser(c * gin.Context) {
	usrId := c.Param("usrId")
	if usrId == "" {
		response := gin.H{
			"code":http.StatusInternalServerError,
			"message": "User Id Is Not provided",
			"user":    usrId,
		}
		c.JSON(http.StatusOK, response)
		return
	}
	status := service.DeleteUser(usrId)
	if status == false {
		response := gin.H{
			"code":http.StatusInternalServerError,
			"message": "Delete user Failed",
			"user":    usrId,
		}
		c.JSON(http.StatusOK, response)
		return
	}
	response := gin.H{
		"code":http.StatusOK,
		"message": "User Deleted successfully",
		"user":    usrId,
	}
	c.JSON(http.StatusOK, response)
}

func GetUserProfile(c *gin.Context) {
	// Get user data from context
	userID, _ := c.Get("userID")
	role, _ := c.Get("role")

	c.JSON(http.StatusOK, gin.H{
		"userID": userID,
		"role":   role,
	})
}