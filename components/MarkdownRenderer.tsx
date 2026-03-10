"use client";

import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { Element, ElementContent } from "hast";
import type { ReactNode } from "react";
import CodeBlock from "./CodeBlock";
import { memo } from "react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Hast helpers
// ---------------------------------------------------------------------------

function isEl(node: ElementContent | undefined, tag: string): node is Element {
  return !!node && node.type === "element" && node.tagName === tag;
}

function hastText(node: Element): string {
  return node.children
    .map((c) => {
      if (c.type === "text") return c.value;
      if (c.type === "element") return hastText(c as Element);
      return "";
    })
    .join("");
}

/**
 * Given a hast `li` node return the heading text (from the leading <strong>)
 * and a markdown string for the body (everything after that strong).
 *
 * Returns null when no leading strong is present.
 */
function splitLiNode(liNode: Element): { heading: string; body: string } | null {
  const first = liNode.children[0] as ElementContent | undefined;

  // Tight list:  li → strong …rest
  if (isEl(first, "strong")) {
    const heading = hastText(first);
    const rest = liNode.children.slice(1);
    const body = hastChildrenToMd(rest);
    return { heading, body };
  }

  // Loose list:  li → p[ strong …rest ] …more-p
  if (isEl(first, "p")) {
    const pNode = first as Element;
    const firstInP = pNode.children[0] as ElementContent | undefined;
    if (isEl(firstInP, "strong")) {
      const strongNode = firstInP as Element;
      const heading = hastText(strongNode);
      // Remaining inline nodes inside the same <p> after the strong
      const inlineRest = pNode.children.slice(1);
      // Any further block children of li after the first <p>
      const blockRest = liNode.children.slice(1);
      const body = [
        hastChildrenToMd(inlineRest),
        ...blockRest.map((c) =>
          c.type === "element" ? hastChildrenToMd((c as Element).children) : "",
        ),
      ]
        .join("\n\n")
        .trim();
      return { heading, body };
    }
  }

  return null;
}

/** Very lightweight hast→markdown-ish text extractor (good enough for body). */
function hastChildrenToMd(nodes: ElementContent[]): string {
  return nodes
    .map((n) => {
      if (n.type === "text") return n.value;
      if (n.type !== "element") return "";
      const el = n as Element;
      const inner = hastChildrenToMd(el.children);
      switch (el.tagName) {
        case "strong": return `**${inner}**`;
        case "em":     return `*${inner}*`;
        case "code":   return `\`${inner}\``;
        case "p":      return inner;
        case "br":     return "\n";
        default:       return inner;
      }
    })
    .join("");
}

// ---------------------------------------------------------------------------
// Shared components (used inside both top-level and nested Markdown calls)
// ---------------------------------------------------------------------------

const sharedComponents = {
  strong({ children }: { children?: ReactNode }) {
    return <strong className="font-bold text-primary">{children}</strong>;
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default memo(function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={cn("text-sm leading-relaxed", className)}>
      <Markdown
        components={{
          ...sharedComponents,

          // ── Lists ───────────────────────────────────────────────────────
          ul({ children }) {
            return (
              <ul className="flex flex-col gap-1.5 my-2 list-none pl-0">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="flex flex-col gap-1.5 my-2 list-none pl-0">
                {children}
              </ol>
            );
          },

          // ── List item ────────────────────────────────────────────────────
          li({ node, children }) {
            const split = node ? splitLiNode(node as Element) : null;

            if (split) {
              return (
                <li className="rounded border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/5 overflow-hidden">
                  {/* Heading strip */}
                  <div className="px-3 py-1.5 border-b border-black/8 dark:border-white/8 bg-black/4 dark:bg-white/6">
                    <span className="text-xs font-semibold text-primary capitalize tracking-wider">
                      {split.heading}
                    </span>
                  </div>
                  {/* Body — re-render body markdown so inline formatting works */}
                  {split.body && (
                    <div className="px-3 py-2 text-sm [&>p]:m-0 [&>p]:leading-relaxed">
                      <Markdown components={sharedComponents}>
                        {split.body}
                      </Markdown>
                    </div>
                  )}
                </li>
              );
            }

            // Plain card — no leading bold
            return (
              <li className="px-3 py-2 rounded border border-black/10 dark:border-white/10 bg-black/3 dark:bg-white/5 text-sm [&>p]:m-0">
                {children}
              </li>
            );
          },

          // ── Code ─────────────────────────────────────────────────────────
          // In react-markdown v9+, fenced blocks are: pre > code.language-*
          // Override `pre` to catch block code; keep `code` for inline only.
          pre({ children }) {
            // Extract the inner <code> element rendered by react-markdown
            const child = Array.isArray(children) ? children[0] : children;
            if (
              child &&
              typeof child === "object" &&
              "props" in child &&
              child.props?.className?.startsWith("language-")
            ) {
              const language = child.props.className.replace("language-", "");
              const code = String(child.props.children).replace(/\n$/, "");
              return <CodeBlock code={code} language={language} />;
            }
            // Fallback: plain pre (no language tag)
            if (
              child &&
              typeof child === "object" &&
              "props" in child &&
              typeof child.props?.children === "string"
            ) {
              const code = String(child.props.children).replace(/\n$/, "");
              return <CodeBlock code={code} />;
            }
            return <pre>{children}</pre>;
          },
          code({ children }) {
            // Only inline code reaches here (block code is caught by `pre` above)
            return (
              <code className="px-1 py-0.5 rounded bg-black/8 dark:bg-white/10 font-mono text-xs text-primary">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
})
