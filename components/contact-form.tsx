"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "@/lib/actions/contact";
import { contactSchema } from "@/lib/schemas/contact";
import { cn } from "@/lib/utils";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });
  const messageLength = form.watch("message").length;

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    setIsSubmitting(true);
    setSubmitResult(null);
    const result = await sendContactEmail(values);
    setIsSubmitting(false);

    if (result.success) {
      setSubmitResult({ success: true, message: "Message sent. I’ll get back to you soon." });
      form.reset();
    } else {
      setSubmitResult({ success: false, message: result.error ?? "Something went wrong. Please try again or email me directly." });
    }
  }

  return (
    <Card className="overflow-hidden rounded-2xl border-border bg-card/65 shadow-[0_30px_100px_hsl(var(--primary)/0.08)]">
      <CardHeader className="border-b border-border p-6 md:p-8">
        <p className="section-kicker">Project brief</p>
        <CardTitle className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">Share the essentials.</CardTitle>
        <CardDescription className="max-w-lg text-sm leading-6">
          A few useful details are enough. Please don&apos;t include passwords,
          API keys, or other sensitive information.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input autoComplete="name" placeholder="Your name" className="h-12 rounded-xl bg-background/70" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" className="h-12 rounded-xl bg-background/70" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-baseline justify-between gap-4">
                    <FormLabel>What are you working on?</FormLabel>
                    <span className="font-mono text-[0.7rem] text-muted-foreground" aria-hidden="true">{messageLength} characters</span>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="The goal, current challenge, timeline, and where you need help…"
                      className="min-h-48 resize-y rounded-xl bg-background/70 leading-6"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Include links only when they are safe to share.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitResult && (
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "rounded-xl border p-4 text-sm leading-6",
                  submitResult.success
                    ? "border-signal/30 bg-signal/10 text-signal"
                    : "border-destructive/40 bg-destructive/10 text-destructive-foreground",
                )}
              >
                {submitResult.message}
              </p>
            )}

            <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-muted-foreground">I usually reply with questions or a concrete next step.</p>
              <Button type="submit" size="lg" disabled={isSubmitting} className="rounded-full sm:min-w-44">
                {isSubmitting ? (
                  <>
                    <Loader2 data-icon="inline-start" className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send message
                    <Send data-icon="inline-end" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
