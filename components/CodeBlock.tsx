"use client";

import { Terminal } from "@/components/ui/terminal";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language,
  className,
}: CodeBlockProps) {
  return (
    <Terminal
      sequence={false}
      startOnView={false}
      className={cn(
        "max-w-full max-h-none h-auto rounded-lg my-2 text-xs",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language ?? "text"}
          style={oneDark}
          wrapLongLines={true}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "0.75rem",
            lineHeight: "1.5",
            overflowX: "visible",
          }}
          codeTagProps={{ style: { background: "transparent" } }}
          PreTag="div"
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </Terminal>
  );
}
