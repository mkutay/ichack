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
    <div className="w-full space-y-8 my-6 pr-6">
      <Suspense fallback={<MainRootFallback/>}>
        <MainRoot id={id}/>
      </Suspense>
      <Suspense fallback={<UnderNodesFallback/>}>
        <UnderNodes id={id}/>
      </Suspense>
      {/* <MainRootFallback/> */}
      {/* <UnderNodesFallback/> */}
    </div>
  )
}

// DND: DILEMMAS AND DECISIONS (w/ Pathfinder)