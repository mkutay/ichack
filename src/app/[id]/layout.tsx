import { InfoComp } from "@/components/infoComp";
import { InfoCompFallback } from "@/components/infoCompForm";
import { Suspense, use } from 'react'

type Params = Promise<{ id: string }>;

export default function Layout(props: {
  children: React.ReactNode
  params: Params
}) {
  const params = use(props.params);
  const { id } = params;

  return (
    <div className="flex flex-row h-full">
      {props.children}
      <div className="overflow-auto max-h-screen w-1/3 py-6 px-6 flex flex-col gap-6 justify-between bg-background border-l-2 border-border">
        <div className="space-y-4 w-full">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Info pages, question and answers
          </h2>
          <Suspense fallback={<InfoCompFallback/>}>
            <InfoComp id={id}/>
          </Suspense>
          {/* <InfoCompFallback/> */}
        </div>
        <div className="flex flex-row justify-end">
          <div className="text-lg font-semibold">
            DnD: Dilemmas And Decisions
          </div>
        </div>
      </div>
    </div>
  );
}