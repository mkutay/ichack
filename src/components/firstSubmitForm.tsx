"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
 
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { insertFirstScenario } from "@/lib/db";

const formSchema = z.object({
  scenarioText: z.string().min(1, {
    message: "Send at least one character.",
  }),
});

export function FirstSubmitForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scenarioText: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await insertFirstScenario(values.scenarioText);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1.5">
        <FormField
          control={form.control}
          name="scenarioText"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel></FormLabel> */}
              <FormControl>
                <Textarea placeholder="What decision do you want to make?" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
