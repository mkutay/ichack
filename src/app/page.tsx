'use client';

import { FirstSubmitForm } from "@/components/firstSubmitForm";
import { Button } from "@/components/ui/button";
import { CreateExample } from "@/lib/db";

export default function Page() {
  return (
    <div className="md:max-w-6xl max-w-prose w-full mx-auto my-6 space-y-8 px-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Placeholder.AI
      </h1>
      <div className="max-w-xl mx-auto">
        <FirstSubmitForm/>
        <div className="scroll-m-20 text-2xl font-semibold tracking-tight mt-4">
          First time? Here are some things you could ask me.
        </div>
        <Button onClick={async () => await CreateExample("I'm thinking about studying computer science at university.")} className="px-4 py-3 my-4 w-full flex flex-col text-text bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-center justify-center rounded-base ring-offset-white transition-all gap-3">
          <div className="text-lg font-base text-left w-full leading-6 tracking-normal">Should I study computer science at university?</div>
        </Button>
        <Button onClick={async () => await CreateExample('I have a gambling problem.')} className="px-4 py-3 my-4 w-full flex flex-col text-text bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-center justify-center rounded-base ring-offset-white transition-all gap-3">
          <div className="text-lg font-base text-left w-full leading-6 tracking-normal">I have a gambling problem.</div>
        </Button>
        <Button onClick={async () => await CreateExample('How can I grow my business?')} className="px-4 py-3 my-4 w-full flex flex-col text-text bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-center justify-center rounded-base ring-offset-white transition-all gap-3">
          <div className="text-lg font-base text-left w-full leading-6 tracking-normal">How can I grow my business?</div>
        </Button>  
      </div>
    </div>
  );
}
