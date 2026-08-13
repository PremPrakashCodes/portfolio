import type { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef } from "react";
import CodeBlock from "./code-block";
import { cn } from "@/lib/utils";

function headingId(children: React.ReactNode) {
  return typeof children === "string" ? children.toLowerCase().replace(/\s+/g, "-") : undefined;
}

function Callout({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "warning" | "tip" }) {
  return (
    <aside className={cn("my-8 rounded-xl border p-5 text-base leading-7", type === "warning" ? "border-destructive/30 bg-destructive/10 text-foreground" : type === "tip" ? "border-signal/30 bg-signal/10 text-foreground" : "border-primary/30 bg-primary/10 text-foreground")}>
      {children}
    </aside>
  );
}

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return mdxComponents(components);
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return mdxComponents(components);
}

function mdxComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props: ComponentPropsWithoutRef<"h1">) => <h1 className="mt-12 text-4xl font-semibold tracking-tight text-foreground" {...props} />,
    h2: ({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
      <h2 id={headingId(children)} className="scroll-mt-28 pt-14 text-3xl font-semibold tracking-[-0.025em] text-foreground md:text-4xl" {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }: ComponentPropsWithoutRef<"h3">) => (
      <h3 id={headingId(children)} className="scroll-mt-28 pt-10 text-2xl font-semibold tracking-tight text-foreground" {...props}>{children}</h3>
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => <p className="mt-6 text-[1.0625rem] leading-8 text-muted-foreground md:text-lg md:leading-9" {...props} />,
    ul: (props: ComponentPropsWithoutRef<"ul">) => <ul className="mt-6 flex list-disc flex-col gap-3 pl-6 text-[1.0625rem] leading-8 text-muted-foreground marker:text-signal md:text-lg" {...props} />,
    ol: (props: ComponentPropsWithoutRef<"ol">) => <ol className="mt-6 flex list-decimal flex-col gap-4 pl-6 text-[1.0625rem] leading-8 text-muted-foreground marker:font-mono marker:text-primary md:text-lg" {...props} />,
    li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
    strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-foreground" {...props} />,
    a: (props: ComponentPropsWithoutRef<"a">) => <a className="font-medium text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary" {...props} />,
    code: (props: ComponentPropsWithoutRef<"code"> & { "data-language"?: string }) => props["data-language"] ? <code {...props} className={undefined} /> : <code className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[0.9em] text-signal" {...props} />,
    pre: (props: ComponentPropsWithoutRef<"pre">) => <CodeBlock {...props} />,
    blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => <blockquote className="my-10 border-l-2 border-signal pl-6 text-xl italic leading-9 text-foreground/80" {...props} />,
    Callout,
    ...components,
  };
}
