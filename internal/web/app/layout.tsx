import "@/styles/globals.css"

import { Metadata, Viewport } from "next"
import { siteConfig } from "@/site"

import { getSession } from "@/lib/auth/actions/session"
import { fontSans } from "@/lib/fonts"
import { Providers } from "@/components/Providers"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = getSession()

  return (
    <>
      <html lang="en" className="dark" suppressHydrationWarning>
        <body
          className={`min-h-screen antialiased bg-accent tracking-tight flex flex-col ${fontSans.variable}`}
        >
          <Providers
            attribute="class"
            defaultTheme="dark"
            user={user}
            enableSystem
          >
            <div className="w-full min-h-screen antialiased bg-accent tracking-tight flex flex-col">
              {children}
            </div>
          </Providers>
        </body>
      </html>
    </>
  )
}
