import { ScenarioFallback } from "@/components/scenarioFallback";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { getScenario } from "@/lib/db";
import { ArrowUpIcon, UpdateIcon, Pencil2Icon } from "@radix-ui/react-icons";
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
    <div className="w-full flex flex-row items-start gap-2">
      <div className="-right-10 relative mx-auto px-4 py-3 min-h-48 w-1/3 text-text bg-bw border-2 border-border flex flex-col items-center justify-start rounded-base ring-offset-white gap-2">
        {scenario[0].title !== '' && <div className="text-xl font-bold tracking-tight leading-none text-left w-full">{scenario[0].title}</div>}
        <div className={"text-lg font-base text-left w-full leading-6 tracking-normal" + (scenario[0].title !== '' ? "font-bold" : "")}>{scenario[0].description}</div>
      </div>
      <Button className={"relative right-0" + scenario[0].parent_scenario_id === null ? "opacity-20" : ""} asChild variant={scenario[0].parent_scenario_id === null ? "noShadow" : "default"} size="icon" disabled={scenario[0].parent_scenario_id === null}>
        {scenario[0].parent_scenario_id !== null ? <Link href={`/${scenario[0].parent_scenario_id}?isNotFirst=true`}>
          <ArrowUpIcon/>
        </Link> : <div><ArrowUpIcon/></div>}
      </Button>
      <Button className="relative right-0" size="icon" variant="default">
        <UpdateIcon/>
      </Button>
      <Button className="relative right-0" size="icon" variant="default">
        <Link href="/"><Pencil2Icon/></Link>
      </Button>
    </div>
  )
}

export function MainRootFallback() {
  return (
    <div className="w-full flex flex-row items-start">
      <div className="-right-10 relative mx-auto px-4 py-3 w-1/3 min-h-48 text-text bg-bw border-2 border-border flex flex-col items-start justify-start rounded-base ring-offset-white gap-2">
        <Skeleton className="h-[20px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-2/5"/>
      </div>
      <Button variant="noShadow" size="icon" className="relative right-0">
        <ArrowUpIcon/>
      </Button>
    </div>
  )
}