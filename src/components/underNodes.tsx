import { getQuestionsAndInsert, getScenario } from "@/lib/db";
import { ScenarioFallback } from "./scenarioFallback";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function UnderNodes({ id }: { id: string }) {
  const scenario = await getScenario(id);

  if (scenario.length === 0) {
    return <div>Scenario not found</div>;
  }

  if (scenario[0].title === null || scenario[0].description === null) {
    return <ScenarioFallback/>;
  }

  let childScenarios: {
    id: string;
    title: string | null;
    description: string | null;
    question_ids: string[] | null;
    scenario_ids: string[] | null;
    parent_scenario_id: string | null;
  }[];

  if (scenario[0].scenario_ids === null) {
    childScenarios = [];
    if (scenario[0].question_ids === null) {
      await getQuestionsAndInsert(scenario[0].id);
      // revalidatePath('/[id]');
      redirect(`/${scenario[0].id}`);
    }
  } else {
    childScenarios = await Promise.all(scenario[0].scenario_ids.map((scenarioId) => getScenario(scenarioId).then((s) => s[0])));
  }

  return (
    <div className="flex flex-row w-full gap-4 pl-6 mt-6">
      {childScenarios.map((childScenario) => (
        <Link href={`/${childScenario.id}`} key={childScenario.id} className="px-4 py-3 min-h-72 w-full flex flex-col text-text bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-center justify-start rounded-base ring-offset-white transition-all gap-3">
          {childScenario.title !== '' && <div className="text-xl font-bold leading-none tracking-tight text-left w-full">{childScenario.title}</div>}
          <div className="text-lg font-base text-left w-full leading-6 tracking-normal">{childScenario.description}</div>
        </Link>
      ))}
    </div>
  );
}

export function UnderNodesFallback() {
  return (
    <div className="flex flex-row w-full gap-4 pl-6">
      <div className="px-4 py-3 min-h-72 w-full text-text flex flex-col bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-start justify-start rounded-base ring-offset-white transition-all gap-1.5">
        <Skeleton className="h-[20px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-3/5"/>
      </div>
      <div className="px-4 py-3 min-h-72 w-full text-text flex flex-col bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-start justify-start rounded-base ring-offset-white transition-all gap-1.5">
        <Skeleton className="h-[20px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-3/5"/>
      </div>
      <div className="px-4 py-3 min-h-72 w-full text-text flex flex-col bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-start justify-start rounded-base ring-offset-white transition-all gap-1.5">
        <Skeleton className="h-[20px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-full"/>
        <Skeleton className="h-[18px] w-3/5"/>
      </div>
    </div>
  );
}