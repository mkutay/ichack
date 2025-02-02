import { InfoComp } from "@/components/infoComp";
import { InfoCompFallback } from "@/components/infoCompForm";
import { MainRoot, MainRootFallback } from "@/components/mainRoot";
import { UnderNodes, UnderNodesFallback } from "@/components/underNodes";
import { Suspense, use } from "react";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = use(props.params);
  const id = params.id;

  return (
    <div className="flex flex-row h-full">
      <div className="w-full my-6 pr-6">
        <Suspense fallback={<MainRootFallback/>}>
          <MainRoot id={id}/>
        </Suspense>
        <Suspense fallback={<div/>}>
          <UnderNodes id={id}/>
        </Suspense>
        {/* <MainRootFallback/>
        <UnderNodesFallback/> */}
      </div>
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
  )
}

// DND: DILEMMAS AND DECISIONS (w/ Pathfinder)