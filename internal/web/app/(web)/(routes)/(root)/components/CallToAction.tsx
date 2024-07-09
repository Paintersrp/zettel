import Link from "next/link"

import { buttonVariants } from "@/components/ui/variants/button"
import { SlideUp } from "@/components/SlideUp"

import { SectionHeader } from "./SectionHeader"

export const CallToAction = () => {
  return (
    <section className="text-center max-w-2xl">
      <SlideUp>
        <SectionHeader
          title="Ready to revolutionize your note-taking?"
          description="Join thousands of users who have transformed their productivity with our
        note-taking system."
        />
        <Link href="/register" className={buttonVariants({ size: "sm" })}>
          Register Now
        </Link>
      </SlideUp>
    </section>
  )
}

export default CallToAction
