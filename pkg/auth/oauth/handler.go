package oauth

import (
	"net/http"
	"os"

	"github.com/Paintersrp/zettel/internal/config"
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/internal/validate"
	"github.com/Paintersrp/zettel/pkg/auth/user"
	"github.com/Paintersrp/zettel/pkg/auth/utils"
	"github.com/labstack/echo/v4"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
	"golang.org/x/oauth2/google"
)

var (
	googleUserInfoURL = "https://www.googleapis.com/oauth2/v3/userinfo"
	missingCodeError  = "Missing code query parameter"
)

type OAuthHandler struct {
	google       *oauth2.Config
	github       *oauth2.Config
	db           *db.Queries
	userService  *user.UserService
	oauthService *OAuthService
	validator    *validate.Validator
	config       *config.Config
}

func NewOAuthHandler(
	queries *db.Queries,
	cfg *config.Config,
	userService *user.UserService,
	oauthService *OAuthService,
	validator *validate.Validator,
) *OAuthHandler {
	googleConfig := &oauth2.Config{
		RedirectURL:  os.Getenv("GOOGLE_REDIRECT_URL"),
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email"},
		Endpoint:     google.Endpoint,
	}
	githubConfig := &oauth2.Config{
		ClientID:     os.Getenv("GITHUB_CLIENT_ID"),
		ClientSecret: os.Getenv("GITHUB_CLIENT_SECRET"),
		RedirectURL:  os.Getenv("GITHUB_REDIRECT_URL"),
		Scopes:       []string{"user:email"},
		Endpoint:     github.Endpoint,
	}

	return &OAuthHandler{
		google:       googleConfig,
		github:       githubConfig,
		db:           queries,
		userService:  userService,
		oauthService: oauthService,
		validator:    validator,
		config:       cfg,
	}
}

func (h *OAuthHandler) GoogleLogin(c echo.Context) error {
	url := h.google.AuthCodeURL("state", oauth2.AccessTypeOffline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (h *OAuthHandler) GoogleCallback(c echo.Context) error {
	code := c.QueryParam("code")
	if code == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": missingCodeError})
	}

	token, err := h.oauthService.HandleGoogleCallback(
		c.Request().Context(),
		code,
		h.google,
		h.config.JwtSecret,
	)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	c.SetCookie(utils.GenerateCookie(token))
	return renderTokenHTML(c, token)
}

func (h *OAuthHandler) GitHubLogin(c echo.Context) error {
	url := h.github.AuthCodeURL("state", oauth2.AccessTypeOnline)
	return c.Redirect(http.StatusTemporaryRedirect, url)
}

func (h *OAuthHandler) GitHubCallback(c echo.Context) error {
	code := c.QueryParam("code")
	if code == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": missingCodeError})
	}

	token, err := h.oauthService.HandleGitHubCallback(
		c.Request().Context(),
		code,
		h.github,
		h.config.JwtSecret,
	)
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			map[string]string{"error": err.Error()},
		)
	}

	c.SetCookie(utils.GenerateCookie(token))
	return renderTokenHTML(c, token)
}

func renderTokenHTML(c echo.Context, token string) error {
	html := `
    <html>
      <body>
        <script>
          window.opener.postMessage({ token: '` + token + `' }, window.origin);
          window.opener.postMessage({ success: true, token: '` + token + `' }, 'http://localhost:6474');
          window.close();
        </script>
      </body>
    </html>
  `
	return c.HTML(http.StatusOK, html)
}
