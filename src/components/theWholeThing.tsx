'use client';

import Link from "next/link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";

export function TheWholeThing({ scenario, childScenarios }: {
  scenario: {
    id: string;
    title: string | null;
    description: string | null;
    question_ids: string[] | null;
    scenario_ids: string[] | null;
    parent_scenario_id: string | null;
  }[],
  childScenarios: {
    id: string;
    title: string | null;
    description: string | null;
    question_ids: string[] | null;
    scenario_ids: string[] | null;
    parent_scenario_id: string | null;
  }[],
}) {
  return (
    <div className="w-full space-y-8 my-6 pr-6 ml-6">
      <div className="w-full flex flex-row items-center">
        <div className="-right-5 relative mx-auto px-4 py-2 h-full w-1/3 text-text bg-bw border-2 border-border shadow-shadow flex flex-col items-center justify-center rounded-base ring-offset-white gap-2">
          {scenario[0].title !== '' && <div className="text-xl font-bold">{scenario[0].title}</div>}
          <div className="text-lg font-base">{scenario[0].description}</div>
        </div>
        <HoverCard>
          <HoverCardTrigger asChild className="relative right-0">
            <Button variant={scenario[0].parent_scenario_id === null ? "noShadow" : "default"} size="icon" disabled={scenario[0].parent_scenario_id === null}>
              <Link href={`/${scenario[0].parent_scenario_id}`}>
                <ArrowUpIcon/>
              </Link>
            </Button>
          </HoverCardTrigger>
          <HoverCardContent>
            Go back to the previous scenario.
          </HoverCardContent>
        </HoverCard>
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
  );
}