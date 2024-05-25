// Code generated by templ - DO NOT EDIT.

// templ: version: v0.2.696
package base

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import "context"
import "io"
import "bytes"

import (
	"github.com/Paintersrp/zettel/internal/db"
	"github.com/Paintersrp/zettel/pkg/web/views/components/icons"
)

func Drawer(user db.User) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, templ_7745c5c3_W io.Writer) (templ_7745c5c3_Err error) {
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templ_7745c5c3_W.(*bytes.Buffer)
		if !templ_7745c5c3_IsBuffer {
			templ_7745c5c3_Buffer = templ.GetBuffer()
			defer templ.ReleaseBuffer(templ_7745c5c3_Buffer)
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var1 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var1 == nil {
			templ_7745c5c3_Var1 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<div x-data=\"{\nslideOverOpen: false\n}\" class=\"relative z-50 w-auto h-auto flex\"><button @click=\"slideOverOpen=true\" class=\"btn-secondary text-primary border-none px-2 py-2 ml-2\"><span class=\"size-6\">")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = icons.Menu().Render(ctx, templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</span></button><template x-teleport=\"body\"><div x-show=\"slideOverOpen\" @keydown.window.escape=\"slideOverOpen=false\" class=\"relative z-[99]\"><div x-show=\"slideOverOpen\" x-transition.opacity.duration.600ms @click=\"slideOverOpen = false\" class=\"fixed inset-0 bg-black bg-opacity-10\"></div><div class=\"fixed inset-0 overflow-hidden\"><div class=\"absolute inset-0 overflow-hidden\"><div class=\"fixed inset-y-0 right-0 flex max-w-full pl-10\"><div x-show=\"slideOverOpen\" @click.away=\"slideOverOpen = false\" x-transition:enter=\"transform transition ease-in-out duration-500 sm:duration-700\" x-transition:enter-start=\"translate-x-full\" x-transition:enter-end=\"translate-x-0\" x-transition:leave=\"transform transition ease-in-out duration-500 sm:duration-700\" x-transition:leave-start=\"translate-x-0\" x-transition:leave-end=\"translate-x-full\" class=\"w-screen max-w-xs\"><div class=\"flex flex-col h-full py-5 overflow-y-scroll bg-page border-l shadow-lg\"><div class=\"px-4 sm:px-5\"><div class=\"flex items-center justify-between pb-1\"><div class=\"flex items-center gap-2\"><span class=\"flex items-center justify-center flex-shrink-0 size-8 text-primary\">")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = icons.Brain().Render(ctx, templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</span></div><div class=\"flex items-center h-auto ml-3\"><button @click=\"slideOverOpen=false\" class=\"absolute top-0 right-0 z-30 flex items-center justify-center px-3 py-2 mt-4 mr-5 space-x-1 font-medium btn-primary uppercase text-xs\"><svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"w-4 h-4\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 18L18 6M6 6l12 12\"></path></svg> <span>Close</span></button></div></div></div><!-- Drawer Main Content --><div class=\"relative flex-1 mt-4\"><div class=\"absolute inset-0 px-4 sm:px-5\"><div class=\"relative flex flex-col justify-between h-full overflow-hidden rounded\"><nav class=\"w-full\"><ul class=\"space-y-2 w-full\">")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = DrawerListItem("Vault", "/vault", icons.Vault()).Render(ctx, templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = DrawerListItem("News", "#", icons.News()).Render(ctx, templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = DrawerListItem("Contact", "#", icons.Contact()).Render(ctx, templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</ul></nav><nav class=\"w-full\"><ul class=\"space-y-2 w-full\">")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		if user.Username == "" {
			templ_7745c5c3_Err = DrawerListItem("Login", "/login", icons.Login()).Render(ctx, templ_7745c5c3_Buffer)
			if templ_7745c5c3_Err != nil {
				return templ_7745c5c3_Err
			}
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString(" ")
			if templ_7745c5c3_Err != nil {
				return templ_7745c5c3_Err
			}
			templ_7745c5c3_Err = DrawerListItem("Register", "/register", icons.Register()).Render(ctx, templ_7745c5c3_Buffer)
			if templ_7745c5c3_Err != nil {
				return templ_7745c5c3_Err
			}
		} else {
			templ_7745c5c3_Err = DrawerListItem("Logout", "/v1/auth/logout", icons.Logout()).Render(ctx, templ_7745c5c3_Buffer)
			if templ_7745c5c3_Err != nil {
				return templ_7745c5c3_Err
			}
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</ul></nav></div></div></div><!-- Drawer Footer --><div class=\"px-4 sm:px-5 mt-4\"><div class=\"flex flex-col justify-between items-center\"><div class=\"text-[0.8rem] text-muted\">&copy; 2024 SRP. All Rights Reserved.</div><div class=\"flex justify-center items-center mt-2 text-xs font-medium text-primary\"><a href=\"#\" class=\"\">Privacy Policy</a> <span class=\"mx-2\">|</span> <a href=\"#\" class=\"\">Terms of Use</a></div></div></div></div></div></div></div></div></div></template></div>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		if !templ_7745c5c3_IsBuffer {
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteTo(templ_7745c5c3_W)
		}
		return templ_7745c5c3_Err
	})
}

func DrawerListItem(text, href string, icon templ.Component) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, templ_7745c5c3_W io.Writer) (templ_7745c5c3_Err error) {
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templ_7745c5c3_W.(*bytes.Buffer)
		if !templ_7745c5c3_IsBuffer {
			templ_7745c5c3_Buffer = templ.GetBuffer()
			defer templ.ReleaseBuffer(templ_7745c5c3_Buffer)
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var2 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var2 == nil {
			templ_7745c5c3_Var2 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<li><a href=\"")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		var templ_7745c5c3_Var3 templ.SafeURL = templ.URL(href)
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString(templ.EscapeString(string(templ_7745c5c3_Var3)))
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("\" class=\"flex gap-4 items-center justify-between px-4 py-2 font-medium text-muted rounded hover:bg-contrast\">")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		var templ_7745c5c3_Var4 string
		templ_7745c5c3_Var4, templ_7745c5c3_Err = templ.JoinStringErrs(text)
		if templ_7745c5c3_Err != nil {
			return templ.Error{Err: templ_7745c5c3_Err, FileName: `layouts/base/drawer.templ`, Line: 123, Col: 9}
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString(templ.EscapeString(templ_7745c5c3_Var4))
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<div class=\"size-6 text-primary\">")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = icon.Render(ctx, templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</div></a></li>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		if !templ_7745c5c3_IsBuffer {
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteTo(templ_7745c5c3_W)
		}
		return templ_7745c5c3_Err
	})
}