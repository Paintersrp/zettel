import type { FC } from "react"

import { capFirst } from "@/lib/utils"

import { CloseIcon } from "./icons"
import UserPlus from "./icons/UserPlus"
import { useAuth } from "./providers/AuthProvider"
import { TooltipWrapper } from "./ui/Tooltip"

interface BannerProps {}

const Banner: FC<BannerProps> = () => {
  const { user } = useAuth()
  if (!user) {
    return null
  }

  return (
    <div className="w-full min-h-10 py-2 duration-300 ease-out bg-contrast border-b border-border shadow-sm sm:py-0 sm:h-10">
      <div className="flex items-center justify-between w-full h-full mx-auto container px-4 sm:px-8">
        <a
          href="#"
          className="flex flex-col w-full h-full text-[0.8rem] leading-6 duration-150 ease-out sm:flex-row sm:items-center opacity-80 hover:opacity-100"
        >
          <span className="flex items-center">
            <span className="size-5 mr-1 text-primary">
              <UserPlus />
            </span>
            <strong className="font-semibold">
              Welcome from {capFirst(user.onboarding_from)}, {user.username}
            </strong>
            <span className="hidden w-px h-4 mx-3 rounded-full sm:block bg-default"></span>
          </span>
          <span className="block pt-1 pb-2 leading-none sm:inline sm:pt-0 sm:pb-0 font-medium">
            Click this banner to complete your profile.
          </span>
        </a>
        {/* TODO: Add confirm "Are you sure you want to hide this?" */}
        <TooltipWrapper content="Dismiss">
          <button className="flex items-center flex-shrink-0 translate-x-1 ease-out duration-150 justify-center w-6 h-6 p-3 rounded-full hover:bg-page mr-3">
            <div className="flex items-center">
              <span className="size-5 text-primary">
                <CloseIcon />
              </span>
            </div>
          </button>
        </TooltipWrapper>
      </div>
    </div>
  )
}

export { Banner }