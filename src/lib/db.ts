'use server';

import { sql } from '@/lib/postgres';
import { redirect } from 'next/navigation';

export async function getDecisionFromId(id: string | null) {
  if (id === null) {
    return null;
  }
  const decision = sql`
    SELECT id, text, child_ids
    FROM decision_table
    WHERE id=${id}
  `;
  return decision;
}

export async function insertFirstScenario(scenarioText: string) {
  const id = crypto.randomUUID();
  try {
    await sql`
      INSERT INTO scenarios (id, text, question_ids, scenario_ids, parent_scenario_id)
      VALUES 
      (
        ${id},
        ${scenarioText},
        NULL,
        NULL,
        NULL
      );
    `;
  } catch (e) {
    console.error("trying to insert first scenario with text " + scenarioText + ". error: " + e);
  }

  redirect(`/${id}`);
}

export async function getScenario(id: string): Promise<{
  id: string,
  text: string | null,
  question_ids: string[] | null,
  parent_scenario_id: string | null,
}[]> {
  return sql`
    SELECT id, text, question_ids, scenario_ids, parent_scenario_id
    FROM scenarios
    WHERE id=${id}
  `;
}

export async function insertQuestions(scenarioId: string, questions: string[]) {
  const questionIds = questions.map(() => crypto.randomUUID());
  try {
    await sql`
      INSERT INTO questions (id, question_text, user_answer)
      VALUES 
      ${questions.map((question, i) => sql`(${questionIds[i]}, ${question}, NULL)`)}
    `;
    await sql`
      UPDATE scenarios
      SET question_ids=${questionIds}
      WHERE id=${scenarioId}
    `;
  } catch (e) {
    console.error("trying to insert questions with text " + questions + ". error: " + e);
  }
}

export async function getQuestionFromId(id: string): Promise<{
  id: string,
  question_text: string | null,
  user_answer: string | null,
}[]> {
  return sql`
    SELECT id, question_text, user_answer
    FROM questions
    WHERE id=${id}
  `;
}

export async function insertQuestionAnswerWithQuestionId(questionId: string, answer: string) {
  try {
    await sql`
      UPDATE questions
      SET user_answer=${answer}
      WHERE id=${questionId}
    `;
  } catch (e) {
    console.error("trying to insert question answer with questionId " + questionId + ". error: " + e);
  }
}

/*
UPDATE scenarios
SET question_ids=ARRAY['f2e65c6d-4c94-443c-983d-71254bcb5726'::UUID, '180cd872-9703-4106-94a2-5aa44e8afa88'::UUID, '63826199-c522-46b1-ba8a-de1cce519213'::UUID]
WHERE id='5c4aa34f-2880-4c3c-8f2c-143000f1c26e';
*/