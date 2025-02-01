import { Skeleton } from "./ui/skeleton";

export function ScenarioFallback() {
  return (
    <div className="md:max-w-6xl max-w-prose w-full mx-auto my-4 space-y-8 px-4">
      <div className="max-w-xl mx-auto">
        <div className="rounded-base h-[150px] w-full border-2 border-border p-4 shadow-shadow space-y-2.5">
          <Skeleton className="w-full h-4"/>
          <Skeleton className="w-full h-4"/>
          <Skeleton className="w-2/3 h-4"/>
        </div>
      </div>
    </div>
  )
}