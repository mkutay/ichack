'use client';

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { SubmitForm } from "@/components/submitForm";
import { DecisionArea } from "@/components/decisionArea";

export default function Home() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <div className="md:max-w-6xl max-w-prose w-full mx-auto my-4 space-y-8 px-4">
      <div className="max-w-xl mx-auto">
        <SubmitForm/>
      </div>
      <div className="w-full justify-center flex flex-row gap-4">
        <DecisionArea text="Don't do this, this is a bad idea :("/>
        <DecisionArea text="Don't do this, this is another bad idea :("/>
        <DecisionArea text="Don't do this, this is another bad idea :("/>
      </div>
    </div>
  );
}
