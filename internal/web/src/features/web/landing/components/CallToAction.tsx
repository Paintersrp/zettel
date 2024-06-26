import { Link } from "@tanstack/react-router"

import { buttonVariants } from "@/components/ui/variants/button"

export const CallToAction = () => {
  return (
    <section className="text-center space-y-6 max-w-2xl">
      <h2 className="text-3xl font-semibold">
        Ready to revolutionize your note-taking?
      </h2>
      <p className="text-xl text-gray-500">
        Join thousands of users who have transformed their productivity with our
        note-taking system.
      </p>
      <Link to="/auth/register" className={buttonVariants()}>
        Start Today
      </Link>
    </section>
  )
}

export default CallToAction
