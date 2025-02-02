import { FirstSubmitForm } from "@/components/firstSubmitForm";

export default function Page() {
  return (
    <div className="md:max-w-6xl max-w-prose w-full mx-auto my-6 space-y-8 px-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        DnD: Dilemmas And Decisions
      </h1>
      <div className="max-w-xl mx-auto">
        <FirstSubmitForm/>
      </div>
    </div>
  );
}
