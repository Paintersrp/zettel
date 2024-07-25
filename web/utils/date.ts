import { default as dayjs } from "dayjs"

export const formatDate = (date: number | string | Date) =>
  dayjs(date).format("MMMM D, YYYY")
