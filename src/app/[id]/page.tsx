import { ScenarioFallback } from "@/components/scenarioFallback";
import { getScenario } from "@/lib/db";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string,
  }>,
}) {
  const { id } = await params;
  const scenario = await getScenario(id);
  console.log(scenario);

  if (scenario.length === 0) {
    return <div>Scenario not found</div>;
  }

  console.log(scenario[0]);

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
  } else {
    childScenarios = await Promise.all(scenario[0].scenario_ids.map((scenarioId) => getScenario(scenarioId).then((s) => s[0])));
  }

  return (
    <div className="w-full my-6 space-y-8 px-4">
      <div className="w-full flex flex-row">
        <div className="mx-auto px-4 py-2 h-full w-1/3 text-text bg-bw border-2 border-border shadow-shadow flex items-center justify-center rounded-base ring-offset-white gap-2">
          {scenario[0].title !== '' && <div className="text-xl font-bold">{scenario[0].title}</div>}
          <div className="text-lg font-base">{scenario[0].description}</div>
        </div>
      </div>
      <div className="flex flex-row w-full gap-4">
        {childScenarios.map((childScenario) => (
          <Link href={`/${childScenario.id}`} key={childScenario.id} className="px-4 py-2 h-full w-full text-text bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-center justify-center rounded-base ring-offset-white transition-all gap-2">
            {childScenario.title !== '' && <div className="text-xl font-bold">{childScenario.title}</div>}
            <div className="text-lg font-base">{childScenario.description}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}