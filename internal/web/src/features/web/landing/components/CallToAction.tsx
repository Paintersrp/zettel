import { Link } from "@tanstack/react-router"

import { buttonVariants } from "@/components/ui/variants/button"

import { SectionHeader } from "./SectionHeader"

export const CallToAction = () => {
  return (
    <section className="text-center max-w-2xl">
      <SectionHeader
        title="Ready to revolutionize your note-taking?"
        description="Join thousands of users who have transformed their productivity with our
        note-taking system."
        classes={{ title: "text-3xl", description: "text-lg" }}
      />
      <Link to="/auth/register" className={buttonVariants()}>
        Register Now
      </Link>
    </section>
  )
}

export default CallToAction
