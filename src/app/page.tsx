import { FirstSubmitForm } from "@/components/firstSubmitForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="md:max-w-6xl max-w-prose w-full mx-auto my-6 space-y-8 px-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Placeholder.AI
      </h1>
      <div className="max-w-xl mx-auto">
        <FirstSubmitForm/>
        <div className="mt-6">
          First time? Here are some things you could ask me.
        </div>
        <Link href={`/`} className="px-4 py-3 my-4 w-full flex flex-col text-text bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-center justify-start rounded-base ring-offset-white transition-all gap-3">
          <div className="text-lg font-base text-left w-full leading-6 tracking-normal">Description</div>
        </Link>
        <Link href={`/`} className="px-4 py-3 my-4 w-full flex flex-col text-text bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-center justify-start rounded-base ring-offset-white transition-all gap-3">
          <div className="text-lg font-base text-left w-full leading-6 tracking-normal">Description</div>
        </Link>
        <Link href={`/`} className="px-4 py-3 my-4 w-full flex flex-col text-text bg-bw border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none items-center justify-start rounded-base ring-offset-white transition-all gap-3">
          <div className="text-lg font-base text-left w-full leading-6 tracking-normal">Description</div>
        </Link>  
      </div>
    </div>
  );
}
