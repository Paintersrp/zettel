import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Skeleton } from "@/components/ui/Skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"

export const DataTableSkeleton = () => {
  return (
    <div className="space-y-4 w-full px-4 py-2">
      <div className="rounded-md border w-full flex">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Skeleton className="size-5" />
              </TableHead>
              {[...Array(5)].map((_, index) => (
                <TableHead key={index}>
                  <Skeleton className="h-8 w-[100px]" />
                </TableHead>
              ))}
              <TableHead className="w-[100px]">
                <Skeleton className="size-7" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell className="w-[40px]">
                  <Skeleton className="size-5" />
                </TableCell>
                {[...Array(5)].map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton className="h-8 w-[100px]" />
                  </TableCell>
                ))}
                <TableCell className="w-[100px]">
                  <Skeleton className="size-7" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[150px] bg-card" />
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-6 w-[120px] bg-card" />
            <Skeleton className="h-8 w-[70px] bg-card" />
          </div>
          <Skeleton className="h-6 w-[80px] bg-card" />
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="h-8 w-8 p-0" disabled>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-8 w-8 p-0" disabled>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataTableSkeleton
