'use client';

import { FirstSubmitForm } from "@/components/firstSubmitForm";
import { Button } from "@/components/ui/button";
import { CreateExample } from "@/lib/db";

export default function Page() {
  const examples = [
    "What time should I go to sleep?",
    "I'm considering studying Computer Science at university.",
    "I'm planning to found a startup."
  ];
  return (
    <div className="md:max-w-6xl max-w-prose w-full mx-auto my-6 space-y-8 px-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Pathfinder AI
      </h1>
      <div className="max-w-xl mx-auto">
        <FirstSubmitForm/>
        <div className="scroll-m-20 text-l font-semibold tracking-tight mt-6">
          First time? Here are some things you could ask me.
        </div>
        {examples.map(example => (
          <Button onClick={async () => await CreateExample(example)} key={example} className="ph-4 my-4 w-full flex flex-col text-text bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-center justify-start rounded-base ring-offset-white transition-all gap-3">
            <div className="text-lg font-base text-left w-full leading-6 tracking-normal">{example}</div>
          </Button>
        ))}
      </div>
    </div>
  );
}
