import { NodeDiv } from "@/components/nodeDiv";
import { QuestionFlexForms } from "@/components/questionFlexForms";
import { ScenarioFallback } from "@/components/scenarioFallback";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getScenario } from "@/lib/db";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string,
  }>,
}) {
  const { id } = await params;
  const scenario = await getScenario(id);

  if (scenario.length === 0) {
    return <div>Scenario not found</div>;
  }

  console.log(scenario[0]);

  if (scenario[0].text === null) {
    return <ScenarioFallback/>;
  }

  let childScenarios: {
    id: string;
    text: string | null;
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
      <div className="max-w-xl mx-auto">
        <NodeDiv text={scenario[0].text}/>
      </div>
      <div className="flex flex-row w-full gap-4">
        {childScenarios.map((childScenario) => (
          <Button key={childScenario.id} asChild>
            <Link href={`/${childScenario.id}`}>
              <Label>{childScenario.text}</Label>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}