'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
 
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { insertQuestionAnswerWithQuestionId, updateScenario } from '@/lib/db';

const formSchema = z.object({
  userAnswers: z.array(z.string().min(1, {
    message: "Send at least one character.",
  })).min(1, {message: "Answer all."}),
});

export function InfoComp({ questions, id }: {
  questions: {
    id: string;
    title: string | null;
    description: string | null;
    user_answer: string | null;
  }[],
  id: string,
}) {
  const userAnswers = questions.map((question) => question.user_answer ?? "");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userAnswers,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    for (const question of questions) {
      await insertQuestionAnswerWithQuestionId(question.id, values.userAnswers[questions.indexOf(question)]);
    }
    await updateScenario(id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="userAnswers"
          render={({ field }) => (
            <div className="flex flex-col gap-3">
              {questions.map((question, index) => (
                <Card key={question.id}>
                  <CardHeader className="p-3 px-4">
                    <CardTitle>
                      {question.title}
                    </CardTitle>
                    <CardDescription>
                      {question.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 px-4 pt-0">
                    <FormItem>
                      <FormControl>
                          <Textarea {...field} value={field.value[index]} onChange={(e) => {
                            const newValue = [...field.value];
                            newValue[index] = e.target.value;
                            field.onChange(newValue);
                          }}/>
                        </FormControl>
                      <FormMessage />
                    </FormItem>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        />
        <div className="flex flex-row justify-end">
          <Button type="submit" disabled={!userAnswers.includes('')} variant={!userAnswers.includes('') ? "noShadow" : "default"}>Submit</Button>
        </div>
      </form>
    </Form>
  );
}