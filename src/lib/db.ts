'use server';

import { sql } from '@/lib/postgres';
import { redirect } from 'next/navigation';
import { AIResponse, getQuestionsClaude, getScenariosClaude, Scenario } from './claude';
import { revalidatePath } from 'next/cache';

/*
-- Create scenarios table
CREATE TABLE scenarios (
  id UUID PRIMARY KEY,
  title TEXT,
  description TEXT,
  question_ids UUID[],
  scenario_ids UUID[],
  parent_scenario_id UUID
);

-- Create questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY,
  title TEXT,
  description TEXT,
  user_answer TEXT
);
*/

export async function insertFirstScenario(response: AIResponse, id: string) {
  const questionTexts: AIResponse[] = await getQuestionsClaude([{title: response.title, description: response.description, questions: null, answers: null} as Scenario]);

  const questionIds = await insertQuestions(id, questionTexts);

  try {
    await sql`
      INSERT INTO scenarios (id, title, description, question_ids, scenario_ids, parent_scenario_id)
      VALUES 
      (${id}, ${response.title}, ${response.description}, ${questionIds}, NULL, NULL);
    `;
  } catch (e) {
    console.error("trying to insert first scenario with text " + response.title + ". error: " + e);
  }
}

export async function getQuestionsAndInsert(scenarioId: string) {
  const questionTexts: AIResponse[] = await getQuestionsClaude(await getRecursiveHistory(scenarioId));
  const questionIds = await insertQuestions(scenarioId, questionTexts);
  // redirect(`/${scenarioId}`);
  // revalidatePath('/[id]');
}

export async function getScenario(id: string): Promise<{
  id: string,
  title: string | null,
  description: string | null,
  question_ids: string[] | null,
  scenario_ids: string[] | null,
  parent_scenario_id: string | null,
}[]> {
  return sql`
    SELECT id, title, description, question_ids, scenario_ids, parent_scenario_id
    FROM scenarios
    WHERE id=${id}
  `;
}

export async function insertQuestions(scenarioId: string, questions: AIResponse[]) {
  const questionIds = questions.map(() => crypto.randomUUID());
  try {
    for (let i = 0; i < questions.length; i++) {
      await sql`
        INSERT INTO questions (id, title, description, user_answer)
        VALUES
        (${questionIds[i]}, ${questions[i].title}, ${questions[i].description}, NULL);
      `;
    }
    await sql`
      UPDATE scenarios
      SET question_ids=${questionIds}
      WHERE id=${scenarioId}
    `;
  } catch (e) {
    console.error("trying to insert questions with text " + questions + ". error: " + e);
  }
  return questionIds;
}

export async function getQuestionFromId(id: string): Promise<{
  id: string,
  title: string | null,
  description: string | null,
  user_answer: string | null,
}[]> {
  return sql`
    SELECT id, title, description, user_answer
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

export async function updateScenario(id: string) {
  const history = await getRecursiveHistory(id);
  const scenarios = await getScenariosClaude(history);
  const scenarioIds = scenarios.map(() => crypto.randomUUID());
  try {
    for (let i = 0; i < scenarios.length; i++) {
      await sql`
        INSERT INTO scenarios (id, title, description, question_ids, scenario_ids, parent_scenario_id)
        VALUES
        (${scenarioIds[i]}, ${scenarios[i].title}, ${scenarios[i].description}, NULL, NULL, ${id});
      `;
    }
    await sql`
      UPDATE scenarios
      SET scenario_ids=${scenarioIds}
      WHERE id=${id}
    `;
  } catch (e) {
    console.error("trying to update scenario with id " + id + ". error: " + e);
  }
}

// index 0 = root
export async function getRecursiveHistory(id: string): Promise<Scenario[]> {
  const scenario = await getScenario(id);
  console.log("scenario: ", scenario);
  if (scenario.length === 0) {
    return [];
  }
  if (scenario[0].parent_scenario_id === null) {
    if (scenario[0].question_ids === null) {
      return [{
        title: scenario[0].title, description: scenario[0].description, questions: null, answers: null
      } as Scenario];
    }
    let questions: {
      title: string,
      description: string,
    }[] = [];
    let answers: string[] = [];
    for (let i = 0; i < scenario[0].question_ids.length; i++) {
      const q = await getQuestionFromId(scenario[0].question_ids[i]);
      questions.push({title: q[0].title ?? '', description: q[0].description ?? ''});
      answers.push(q[0].user_answer ?? '');
    }
    return [{
      title: scenario[0].title, description: scenario[0].description, questions, answers
    } as Scenario];
  }
  const history = await getRecursiveHistory(scenario[0].parent_scenario_id);

  if (scenario[0].question_ids === null) {
    return [{
      title: scenario[0].title, description: scenario[0].description, questions: null, answers: null
    } as Scenario];
  }
  let questions: {
    title: string,
    description: string,
  }[] = [];
  let answers: string[] = [];
  for (let i = 0; i < scenario[0].question_ids.length; i++) {
    const q = await getQuestionFromId(scenario[0].question_ids[i]);
    questions.push({title: q[0].title ?? '', description: q[0].description ?? ''});
    answers.push(q[0].user_answer ?? '');
  }

  return history.concat([{
    title: scenario[0].title, description: scenario[0].description, questions, answers
  } as Scenario]);
}

/*
UPDATE scenarios
SET question_ids=ARRAY['f2e65c6d-4c94-443c-983d-71254bcb5726'::UUID, '180cd872-9703-4106-94a2-5aa44e8afa88'::UUID, '63826199-c522-46b1-ba8a-de1cce519213'::UUID]
WHERE id='5c4aa34f-2880-4c3c-8f2c-143000f1c26e';
*/