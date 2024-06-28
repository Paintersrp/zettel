import type { SVGProps } from "react"

export const VimIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 1H1v3h1v10h3.74L14 3.675V1H8v3h1.432L6 8.119V4h1z"
      ></path>
    </svg>
  )
}
