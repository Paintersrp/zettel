import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getSession } from "@/lib/auth/actions/session"
import { buttonVariants } from "@/components/ui/button/variants"

export const Hero = async () => {
  const user = await getSession()

  return (
    <section className="text-center space-y-6 sm:space-y-12 sm:max-w-4xl mx-auto sm:px-4 py-16 sm:py-24">
      <div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
          <span>The Entry Into Your</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-card via-primary to-card block mt-2">
            Second Brain
          </span>
        </h1>
        <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
          Organize your thoughts with our Zettelkasten-inspired note-taking
          system. Seamlessly sync between desktop and web.
        </p>
      </div>
      <div className="flex flex-col-reverse sm:flex-row justify-center gap-2 sm:gap-4">
        <Link href="/docs" className={buttonVariants({ variant: "outline" })}>
          Documentation
        </Link>
        {user ? (
          <Link href="/app" className={buttonVariants()}>
            Go to App
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        ) : (
          <Link href="/register" className={buttonVariants()}>
            Get started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        )}
      </div>
    </section>
  )
}

export default Hero
