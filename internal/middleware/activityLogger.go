package middleware

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"BackendFramework/internal/database"
)

func LogUserActivity() gin.HandlerFunc {
	return func(c *gin.Context) {
		userID, exists := c.Get("userID")
		if !exists {
			userID = c.PostForm("user_id")
		}

		// Capture Query Parameters
		queryParams := c.Request.URL.Query()

		// Capture Request Body (JSON jika POST/PUT)
		var requestBody map[string]interface{}
		if c.Request.Method == "POST" || c.Request.Method == "PUT" {
			bodyBytes, _ := io.ReadAll(c.Request.Body)
			c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes)) // Restore body agar request tetap bisa dibaca handler
			if err := json.Unmarshal(bodyBytes, &requestBody); err != nil {
				requestBody = nil
			}
		}

		// Capture Form Data jika bukan JSON
		if requestBody == nil {
			formData := make(map[string]interface{})
			c.Request.ParseForm()
			for key, values := range c.Request.PostForm {
				if len(values) == 1 {
					formData[key] = values[0]
				} else {
					formData[key] = values
				}
			}
			requestBody = formData
		}

		// Serialize ke JSON string
		queryParamsJSON, _ := json.Marshal(queryParams)
		requestBodyJSON, _ := json.Marshal(requestBody)

		// Insert ke MySQL
		_, err := database.DbAuth.Exec(`
			INSERT INTO user_activity 
			(user_id, endpoint, method, ip_address, user_agent, query_params, request_body, timestamp)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
			userID,
			c.Request.URL.Path,
			c.Request.Method,
			c.ClientIP(),
			c.GetHeader("User-Agent"),
			string(queryParamsJSON),
			string(requestBodyJSON),
			time.Now(),
		)

		if err != nil {
			c.JSON(http.StatusOK, gin.H{
				"code":  http.StatusUnauthorized,
				"error": "Failed To Log User Activity",
			})
			c.Abort()
			return
		}

		c.Next()
	}
}
