package route

import (
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"BackendFramework/internal/controller"
	"BackendFramework/internal/route/v1"
)

func SetupRouter() *gin.Engine {
	
	if os.Getenv("ENVIRONMENT") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	// CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization", "Accept", "Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Global preflight handler untuk OPTIONS
	r.OPTIONS("/*path", func(c *gin.Context) {
		c.Status(200)
	})

	// Route /api/auth
	api := r.Group("/api")
	{
		auth := api.Group("/auth")
		authController := controller.NewAuthController()
		auth.POST("/register", authController.Register)
		auth.POST("/login", authController.LoginWithEmail)
		auth.POST("/login-username", authController.LoginWithUsername)
	}

	// V1 routes
	v1Routes := r.Group("/v1")
	{
		v1.InitRoutes(v1Routes)
	}

	return r
}
