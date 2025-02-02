import { InfoComp } from "@/components/infoComp";
import { getQuestionFromId, getQuestionsAndInsert, getScenario } from "@/lib/db";
import { Suspense } from 'react'

type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Params
}) {
  const { id } = await params;
  const scenario = await getScenario(id);

  if (scenario.length === 0) {
    return <div>Scenario not found ba</div>;
  }

  if (scenario[0].question_ids === null) {
    await getQuestionsAndInsert(id);
    return;
  }

  const questions = await Promise.all(scenario[0].question_ids.map((questionId) => getQuestionFromId(questionId).then((q) => q[0])));

  return (
    <div className="flex flex-row gap-8 mx-0 mr-8 h-full">
      {children}
      <div className="min-h-screen w-1/3 pt-6 pb-4 px-4 flex flex-col justify-between bg-background border-l-2 border-border">
        <div className="space-y-4 w-full">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Info pages, question and answers
          </h2>
          <Suspense>
            <InfoComp questions={questions} id={id}/>
          </Suspense>
        </div>
        <div className="flex flex-row justify-end">
          <div>
            Make Decisions With Claude
          </div>
        </div>
      </div>
    </div>
  );
}