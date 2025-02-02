import { AsyncPage, AsyncPageFallback } from "@/components/asyncPage";
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
    <Suspense fallback={<AsyncPageFallback/>}>
      <AsyncPage id={id}/>
    </Suspense>
  );
}

// DND: DILEMMAS AND DECISIONS (w/ Pathfinder)