'use server';

import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

export type Scenario = {
  name: string,
  questions: string[] | null,
  answer: string[] | null,
}; // same length for q and a

const SYSTEM_PROMPT_QUESTIONS = `You are an intelligent decision-making assistant that helps users explore potential futures by refining their input through insightful clarifying questions. Your goal is to ask the most relevant clarifying and concise short questions based on:

The current scenario the user is considering.
The past scenarios explored so far.
The list of previous questions and answers to maintain logical continuity and avoid redundancy.

Instructions:
When given a current scenario, a list of past scenarios, and a history of questions and answers, generate 2–3 new clarifying questions to refine the user’s decision-making process.
The new questions must logically build on past responses and avoid repetition.
Only output the questions in JSON format as follows:
{
  "questions": [
    "Question 1",
    "Question 2",
    "Question 3"
  ]
}

Rules to Follow:
Ensure questions focus on what matters most to the user based on prior context.
Avoid asking questions that have already been addressed in the input history.
Instead of general questions, aim for specific, insightful questions that challenge the user to reflect deeper.
Do not include explanations or commentary—only output valid JSON.

Input Format:
You will receive structured input in the following format:
{
  "current_scenario": "User's current decision point",
  "past_scenarios": [
    "Previous scenario 1",
    "Previous scenario 2"
  ],
  "qa_history": [
    {
      "question": "Previously asked question",
      "answer": "User's answer to that question"
    },
    {
      "question": "Another previously asked question",
      "answer": "User's answer to that question"
    }
  ]
}`;

const SYSTEM_PROMPT_SCENARIOS = `You are an intelligent decision-making assistant that predicts the most likely future scenarios based on user choices. Your goal is to generate structured, insightful future, concise short scenarios based on:

The current scenario the user is considering.
The user's answers to relevant questions.
Past explored scenarios to maintain continuity and coherence.
Past questions and answers to ensure scenarios evolve meaningfully without redundancy.

Instructions:
Given a current scenario, a history of questions and answers, and previously explored scenarios, generate the three most likely future scenarios that branch from the user's decision.
Ensure logical progression by considering past context and avoiding contradictions.
Only output the scenarios in JSON format as follows:
{
  "scenarios": [
    {
      "title": "Scenario 1 Title",
      "description": "Detailed description of Scenario 1."
    },
    {
      "title": "Scenario 2 Title",
      "description": "Detailed description of Scenario 2."
    },
    {
      "title": "Scenario 3 Title",
      "description": "Detailed description of Scenario 3."
    }
  ]
}

Rules to Follow:
Ensure each scenario is realistic yet distinct to present meaningful choices.
Build on previously asked questions and answers to refine scenarios.
Ensure scenarios do not duplicate past outcomes but expand possibilities.
Only output valid JSON without explanations or extra comments.

Input Format:
You will receive structured input in the following format:
{
  "current_scenario": "User's current decision point",
  "qa_history": [
    {
      "question": "Relevant question",
      "answer": "User's answer to that question"
    },
    {
      "question": "Another relevant question",
      "answer": "User's answer to that question"
    }
  ],
  "past_scenarios": [
    "Previously explored scenario 1",
    "Previously explored scenario 2"
  ],
  "past_qa_history": [
    {
      "question": "Previously asked question",
      "answer": "User's past response"
    },
    {
      "question": "Another previously asked question",
      "answer": "User's past response"
    }
  ]
}`;

export async function getScenarios(history: Scenario[]): Promise<string[]> {
  const prompt = {
    current_scenario: history[0].name,
    qa_history: () => {
      let temp: {
        question: string;
        answer: string;
      }[] = [];

      if (history[0].questions !== null)
        for (const q of history[0].questions) {
          temp.push({ question: q, answer: history[0].answer![history[0].questions.indexOf(q)] });
        }

      return temp;
    },
    past_scenarios: history.slice(1).map((item) => item.name),
    past_qa_history: () => {
      let temp: {
        question: string;
        answer: string;
      }[] = [];

      for (const h of history.slice(1)) {
        if (h.questions !== null)
          for (const q of h.questions) {
            temp.push({ question: q, answer: h.answer![h.questions.indexOf(q)] });
          }
      }

      return temp;
    },
  };
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: SYSTEM_PROMPT_SCENARIOS,
    messages: [{ role: "user", content: JSON.stringify(prompt) }],
  });
  return msg.content.map((item: any) => JSON.parse(item.text).scenarios).map((item: any) => item.title + "\n" + item.description);
}

// the first call would have null questions and answers
export async function getQuestions(history: Scenario[]): Promise<string[]> {
  let temp: {
    question: string;
    answer: string;
  }[] = [];

  for (const h of history) {
    if (h.questions !== null)
      for (const q of h.questions) {
        temp.push({ question: q, answer: h.answer![h.questions.indexOf(q)] });
      }
  }

  const prompt = {
    "current_scenario": history[0].name,
    "past_scenarios": history.slice(1).map((item) => item.name),
    "qa_history": temp,
  }
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: SYSTEM_PROMPT_QUESTIONS,
    messages: [{ role: "user", content: JSON.stringify(prompt) }],
  });

  return msg.content.map((item: any) => JSON.parse(item.text).questions)[0];
}