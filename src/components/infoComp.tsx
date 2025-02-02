import { getQuestionFromId, getQuestionsAndInsert, getScenario } from '@/lib/db';
import { InfoCompForm } from './infoCompForm';


export async function InfoComp({ id }: {
  id: string,
}) {
  let scenario = await getScenario(id);

  if (scenario.length === 0) {
    return <div>Scenario not found ba</div>;
  }

  if (scenario[0].question_ids === null) {
    await getQuestionsAndInsert(id);
    scenario = await getScenario(id);
  }

  if (scenario[0].question_ids === null) return;

  const questions = await Promise.all(scenario[0].question_ids.map((questionId) => getQuestionFromId(questionId).then((q) => q[0])));
  return (
    <InfoCompForm questions={questions} id={id}/>
  );
}