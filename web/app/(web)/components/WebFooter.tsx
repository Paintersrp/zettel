import Link from "next/link"

import { GitHubIcon } from "@/components/icons"

export const WebFooter = () => {
  return (
    <footer className="border-t py-4">
      <div className="container sm:px-8 mx-auto px-4">
        <div className="w-full text-center">
          <ul className="text-sm flex justify-center text-primary">
            <li className="size-6">
              <Link
                href="https://github.com/Paintersrp/zettel"
                className="hover:text-primary-hover"
              >
                <GitHubIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-4 text-center text-[0.8rem]">
        <p>&copy; 2024 Zethub. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default WebFooter
