import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/variants/button"

export const Hero = () => {
  return (
    <section className="text-center space-y-6 sm:space-y-12 sm:max-w-4xl mx-auto sm:px-4 py-16 sm:py-24">
      <div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
          <span className="text-default">The Entry Into Your</span>
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
        <Link to="/demo" className={buttonVariants({ variant: "outline" })}>
          Documentation
        </Link>
        <Link to="/auth/register" className={buttonVariants()}>
          Get started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
      {/* TODO: CLI Documentation / Web / Github Linking */}
    </section>
  )
}

export default Hero
