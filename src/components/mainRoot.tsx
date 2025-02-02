import { ScenarioFallback } from "@/components/scenarioFallback";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { getScenario } from "@/lib/db";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export async function MainRoot({ id }: { id: string }) {
  const scenario = await getScenario(id);

  if (scenario.length === 0) {
    return <div>Scenario not found</div>;
  }

  if (scenario[0].title === null || scenario[0].description === null) {
    return <ScenarioFallback/>;
  }

  return (
    <div className="w-full flex flex-row items-center">
      <div className="mx-auto px-4 py-2 h-full w-1/3 text-text bg-bw border-2 border-border shadow-shadow flex flex-col items-center justify-center rounded-base ring-offset-white gap-2">
        {scenario[0].title !== '' && <div className="text-xl font-bold">{scenario[0].title}</div>}
        <div className="text-lg font-base">{scenario[0].description}</div>
      </div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="noShadow" size="icon" disabled={scenario[0].parent_scenario_id === null}>
            <Link href={`/${scenario[0].parent_scenario_id}`}>
              <ArrowUpIcon/>
            </Link>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          Go back to the previous scenario.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}

export function MainRootFallback() {
  return (
    <div className="w-full flex flex-row items-center">
      <div  className="mx-auto px-4 py-2 h-full w-1/3 text-text bg-bw border-2 border-border shadow-shadow flex flex-col items-center justify-center rounded-base ring-offset-white gap-1.5">
        <Skeleton className="h-[20px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-2/5"/>
      </div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="noShadow" size="icon" disabled={true}>
            <ArrowUpIcon/>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          Go back to the previous scenario.
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}