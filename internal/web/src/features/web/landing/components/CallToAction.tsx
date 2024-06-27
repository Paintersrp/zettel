import { Link } from "@tanstack/react-router"

import { buttonVariants } from "@/components/ui/variants/button"
import { SlideUp } from "@/components/Slide"

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
        <Link to="/auth/register" className={buttonVariants({ size: "sm" })}>
          Register Now
        </Link>
      </SlideUp>
    </section>
  )
}

export default CallToAction
