import Link from "next/link"
import { BrainIcon, FileAxis3d } from "lucide-react"

import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet"
import { GitHubIcon } from "@/components/icons"
import UnderlineLink from "@/components/UnderlineLink"

import WebDrawerAuthButtons from "./WebDrawerAuthButtons"
import { WebDrawerItem } from "./WebDrawerItem"
import WebDrawerSheet from "./WebDrawerSheet"

export const WebDrawer = () => {
  return (
    <WebDrawerSheet>
      <SheetHeader>
        <SheetTitle>
          <BrainIcon className="size-8 text-primary" />
        </SheetTitle>
        <SheetDescription className="text-lg text-primary">
          Welcome to Zethub
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col justify-between h-full">
          <nav className="w-full">
            <ul>
              <WebDrawerItem
                text="Docs"
                to="/docs"
                icon={<FileAxis3d className="size-6 text-primary" />}
              />
            </ul>
          </nav>
          <WebDrawerAuthButtons />
        </div>
        <SheetFooter className="mt-4 justify-center flex flex-col w-full items-center">
          <div className="flex flex-col justify-between items-center">
            <div className="text-[0.8rem] text-muted-foreground">
              &copy; 2024 Zethub. All Rights Reserved.
            </div>
            <div className="flex justify-center items-center mt-2 text-xs font-medium text-primary">
              <UnderlineLink href="#"> Privacy Policy</UnderlineLink>
              <span className="mx-2">|</span>
              <UnderlineLink href="#">Terms of Use</UnderlineLink>
            </div>
          </div>
          <div className="w-full text-center mt-4">
            <ul className="text-sm flex justify-center text-primary">
              <li className="size-6">
                <Link
                  href="https://github.com/Paintersrp/zettel"
                  className="hover:text-primary/80"
                >
                  <GitHubIcon />
                </Link>
              </li>
            </ul>
          </div>
        </SheetFooter>
      </div>
    </WebDrawerSheet>
  )
}

export default WebDrawer
