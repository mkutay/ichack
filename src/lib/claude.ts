'use server';

import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY!,
});

export type Scenario = {
  title: string,
  description: string,
  questions: {
    title: string,
    description: string,
  }[] | null,
  answers: string[] | null,
}; // same length for q and a

export type AIResponse = {
  title: string,
  description: string,
};

const SYSTEM_PROMPT_QUESTIONS = `You are an intelligent decision-making assistant that helps users explore potential futures by refining their input through insightful clarifying questions. Your goal is to ask the most relevant clarifying and very concise short questions based on:

The current scenario the user is considering.
The past scenarios explored so far.
The list of previous questions and answers to maintain logical continuity and avoid redundancy.

Instructions:
When given a current scenario, a list of past scenarios, and a history of questions and answers, generate 2, 3 or 4 new clarifying questions to refine the user’s decision-making process.
Choose the number of questions depending on how much depth is required from the user.
The new questions must logically build on past responses and avoid repetition.
Only output the questions in JSON format as follows:
{
  "questions": [
    {
      "title": "Question 1 in a few short words",
      "description": "Detailed description of question 1."
    },
    {
      "title": "Question 2 in a few short words",
      "description": "Detailed description of question 2."
    },
    {
      "title": "Scenario 3 in a few short words",
      "description": "Detailed description of question 3."
    }
  ]
}

Rules to Follow:
Do not ask the questions you have already asked.
Ensure that questions are not lengthy. Keep them concise and to the point.
Ensure questions focus on what matters most to the user based on prior context.
Avoid asking questions that have already been addressed in the input history.
Instead of general questions, aim for specific, insightful questions that challenge the user to reflect deeper.
Do not include explanations or commentary—only output valid JSON.

Input Format:
You will receive structured input in the following format:
[
  {
    "title": "User's scenario title",
    "description": "Detailed description of the scenario the user is in.",
    "questions": [
      {
        "title": "Some words on relevant question 1.",
        "description": "Detailed description of question 1."
      },
      {
        "title": "Some words on relevant question 2.",
        "description": "Detailed description of question 2."
      }
    ],
    "answer": ["User's answer to relevant question 1.", "User's answer to relevant question 2."]
  }
]`;

const SYSTEM_PROMPT_SCENARIOS = `You are an intelligent decision-making assistant that predicts the most likely future scenarios based on user choices. Your goal is to generate structured, insightful future, very concise short scenarios based on:

The current scenario the user is considering.
The user's answers to relevant questions.
Past explored scenarios to maintain continuity and coherence.
Past questions and answers to ensure scenarios evolve meaningfully without redundancy.

Instructions:
Given a current scenario, a history of questions and answers, and previously explored scenarios, generate the 2, 3 or 4 most likely future scenarios that branch from the user's decision.
Ensure logical progression by considering past context and avoiding contradictions.
Only output the scenarios in JSON format as follows:
{
  "scenarios": [
    {
      "title": "Scenario 1 Title",
      "description": "Concise description of Scenario 1."
    },
    {
      "title": "Scenario 2 Title",
      "description": "Concise description of Scenario 2."
    },
    {
      "title": "Scenario 3 Title",
      "description": "Concise description of Scenario 3."
    }
  ]
}

Rules to Follow:
Do not suggest the scenarios you have already provided.
Ensure each scenario is not lengthy. Keep them concise and to the point.
Ensure each scenario is realistic yet distinct to present meaningful choices.
Build on previously asked questions and answers to refine scenarios.
Ensure scenarios do not duplicate past outcomes but expand possibilities.
Only output valid JSON without explanations or extra comments.

Input Format:
You will receive structured input in the following format:
[
  {
    "title": "User's scenario title",
    "description": "Detailed description of the scenario the user is in.",
    "questions": [
      {
        "title": "Some words on relevant question 1.",
        "description": "Detailed description of question 1."
      },
      {
        "title": "Some words on relevant question 2.",
        "description": "Detailed description of question 2."
      }
    ],
    "answer": ["User's answer to relevant question 1.", "User's answer to relevant question 2."]
  }
]`;

export async function getScenariosClaude(history: Scenario[]): Promise<AIResponse[]> {
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: SYSTEM_PROMPT_SCENARIOS,
    messages: [{ role: "user", content: JSON.stringify(history) }],
  });
  console.log(msg.content);
  return msg.content.map((item: any) => JSON.parse(item.text))[0].scenarios;
}

// the first call would have null questions and answers
export async function getQuestionsClaude(history: Scenario[]): Promise<AIResponse[]> {
  console.log(history);
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 1024,
    system: SYSTEM_PROMPT_QUESTIONS,
    messages: [{ role: "user", content: JSON.stringify(history) }],
  });
  console.log(msg.content);
  console.log(msg.content.map((item: any) => JSON.parse(item.text)));
  return msg.content.map((item: any) => JSON.parse(item.text))[0].questions;
}
