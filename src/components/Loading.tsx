import { LoaderPinwheel } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="flex gap-2">Loading... <LoaderPinwheel className="animate-spin" /></span>
    </div>
  )
}