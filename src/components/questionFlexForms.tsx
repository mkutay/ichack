import { getQuestionFromId } from "@/lib/db";
import { Skeleton } from "./ui/skeleton";
import { QuestionForm } from "./questionForm";

export async function QuestionFlexForms({ questionIds }: { questionIds: string[] | null }) {
  if (questionIds === null) {
    return (
      <div className="w-full flex flex-row gap-4">
        <QuestionFormFallback/>
        <QuestionFormFallback/>
        <QuestionFormFallback/>
      </div>
    );
  }

  const items = await Promise.all(questionIds.map(async (questionId) =>
    ({ question: await getQuestionFromId(questionId).then((item) => item[0].question_text), questionId })));

  return (
    <div className="w-full flex flex-row gap-4">
      {items.map((item) => (
        <QuestionForm key={item.questionId} question={item.question} questionId={item.questionId}/>
      ))}
    </div>
  );
}

export function QuestionFormFallback() {
  return (
    <div className="rounded-base h-[100px] w-full border-2 border-border p-4 shadow-shadow space-y-2.5">
      <Skeleton className="w-full h-4"/>
      <Skeleton className="w-2/3 h-4"/>
    </div>
  );
}