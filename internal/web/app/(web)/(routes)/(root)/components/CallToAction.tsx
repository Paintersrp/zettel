import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getSession } from "@/lib/session"
import { buttonVariants } from "@/components/ui/variants/button"
import { SlideUp } from "@/components/SlideUp"

import { SectionHeader } from "./SectionHeader"

export const CallToAction = async () => {
  const user = await getSession()

  return (
    <section className="text-center max-w-2xl">
      <SlideUp>
        <SectionHeader
          title="Ready to revolutionize your note-taking?"
          description="Join thousands of users who have transformed their productivity with our
        note-taking system."
        />
        {user ? (
          <Link href="/app" className={buttonVariants({ size: "sm" })}>
            Go to App
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        ) : (
          <Link href="/register" className={buttonVariants({ size: "sm" })}>
            Register Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        )}
      </SlideUp>
    </section>
  )
}

export default CallToAction
