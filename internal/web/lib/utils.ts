import { clsx, type ClassValue } from "clsx"
import { formatDistanceToNowStrict } from "date-fns"
import locale from "date-fns/locale/en-US"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str
  return `${str.slice(0, length)}...`
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const formatDistanceLocale = {
  lessThanXSeconds: "just now",
  xSeconds: "just now",
  halfAMinute: "just now",
  lessThanXMinutes: "{{count}}m",
  xMinutes: "{{count}}m",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}w",
  xWeeks: "{{count}}w",
  aboutXMonths: "{{count}} months",
  xMonths: "{{count}} months",
  aboutXYears: "{{count}}y",
  xYears: "{{count}}y",
  overXYears: "{{count}}y",
  almostXYears: "{{count}}y",
}

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {}

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString())

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result
    } else {
      if (result === "just now") return result
      return result + " ago"
    }
  }

  return result
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  })
}

export const formatDecimalHours = (decimalHours: number): string => {
  let hours = Math.floor(decimalHours)
  let minutes = Math.round((decimalHours - hours) * 60)

  if (minutes === 60) {
    hours += 1
    minutes = 0
  }

  const formattedHours = `${hours}:${minutes.toString().padStart(2, "0")}`

  return formattedHours
}

export const calculateRemainingHours = (endTime: string): number => {
  const currentTime = new Date()
  let endTimeToday = new Date(`${currentTime.toDateString()} ${endTime}`)

  if (endTimeToday < currentTime) {
    endTimeToday = new Date(endTimeToday.getTime() + 24 * 60 * 60 * 1000)
  }

  const differenceInMilliseconds =
    endTimeToday.getTime() - currentTime.getTime()
  return differenceInMilliseconds / (1000 * 60 * 60)
}
