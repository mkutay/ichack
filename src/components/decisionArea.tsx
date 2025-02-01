import { PlusIcon } from '@radix-ui/react-icons';

import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

export function DecisionArea({text}: {text: string}) {
  return (
    <div className="w-full space-y-2">
      <ScrollArea className="rounded-base h-[250px] w-full text-mtext border-2 border-border bg-main p-4 shadow-shadow">
        {text}
      </ScrollArea>
      <div className="w-full flex flex-row justify-end">
        <div className="fixed -translate-x-2 -translate-y-9">
          <Button variant="reverse" className="w-0.5 h-1.5">
            <PlusIcon/>
          </Button>
        </div>
      </div>
    </div>
  );
}