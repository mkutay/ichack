import { QuestionFlexForms } from "@/components/questionFlexForms";
import { ScenarioFallback } from "@/components/scenarioFallback";
import { Label } from "@/components/ui/label";
import { getScenario } from "@/lib/db";
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
  console.log(scenario);

  if (scenario.length === 0) {
    return <div>Scenario not found</div>;
  }

  if (scenario[0].text === null) {
    return <ScenarioFallback/>;
  }

  return (
    <div className="md:max-w-6xl max-w-prose w-full mx-auto my-4 space-y-8 px-4">
      <div className="max-w-xl mx-auto">
        <div className="rounded-base h-[125px] w-full border-2 border-border p-4 shadow-shadow items-center flex justify-center">
          <Label className="text-xl">{scenario[0].text}</Label>
        </div>
      </div>
      <Suspense>
        <QuestionFlexForms questionIds={scenario[0].question_ids}/>
      </Suspense>
    </div>
  )
}