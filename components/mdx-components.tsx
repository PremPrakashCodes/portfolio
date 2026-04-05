import type { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef } from "react";

function Callout({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
}) {
  const styles = {
    info: "bg-blue-500/10 border-blue-500/20 text-blue-300",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-300",
    tip: "bg-green-500/10 border-green-500/20 text-green-300",
  };

  return (
    <div className={`p-4 rounded-lg border my-6 ${styles[type]}`}>
      {children}
    </div>
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
    h1: (props: ComponentPropsWithoutRef<"h1">) => (
      <h1 className="text-3xl font-bold mt-10 mb-4 gradient-text" {...props} />
    ),
    h2: (props: ComponentPropsWithoutRef<"h2">) => (
      <h2
        className="text-2xl font-semibold mt-8 mb-3 text-white/90 scroll-mt-24"
        id={typeof props.children === "string" ? props.children.toLowerCase().replace(/\s+/g, "-") : undefined}
        {...props}
      />
    ),
    h3: (props: ComponentPropsWithoutRef<"h3">) => (
      <h3
        className="text-xl font-semibold mt-6 mb-2 text-white/80 scroll-mt-24"
        id={typeof props.children === "string" ? props.children.toLowerCase().replace(/\s+/g, "-") : undefined}
        {...props}
      />
    ),
    p: (props: ComponentPropsWithoutRef<"p">) => (
      <p className="text-gray-400 leading-relaxed my-4" {...props} />
    ),
    ul: (props: ComponentPropsWithoutRef<"ul">) => (
      <ul className="list-disc list-inside text-gray-400 space-y-2 my-4" {...props} />
    ),
    ol: (props: ComponentPropsWithoutRef<"ol">) => (
      <ol className="list-decimal list-inside text-gray-400 space-y-2 my-4" {...props} />
    ),
    li: (props: ComponentPropsWithoutRef<"li">) => (
      <li className="text-gray-400" {...props} />
    ),
    a: (props: ComponentPropsWithoutRef<"a">) => (
      <a className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors" {...props} />
    ),
    code: (props: ComponentPropsWithoutRef<"code">) => (
      <code className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-sm text-blue-300 font-mono" {...props} />
    ),
    pre: (props: ComponentPropsWithoutRef<"pre">) => (
      <pre className="bg-black/50 border border-white/10 rounded-lg p-4 overflow-x-auto my-6 text-sm" {...props} />
    ),
    blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
      <blockquote className="border-l-2 border-blue-500/50 pl-4 italic text-gray-500 my-6" {...props} />
    ),
    Callout,
    ...components,
  };
}
