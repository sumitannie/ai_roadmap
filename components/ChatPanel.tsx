"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, useCallback, memo } from "react";
import { Bot, Send, User, X, MessageSquare, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import MarkdownRenderer from "./MarkdownRenderer";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// ---------------------------------------------------------------------------
// Memoized bubble — only re-renders when text or role changes
// ---------------------------------------------------------------------------
const MessageBubble = memo(function MessageBubble({
  role,
  text,
}: {
  role: string;
  text: string;
}) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "flex gap-2 items-start",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <div
        className={cn(
          "max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed wrap-break-word",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-black/5 dark:bg-white/8 text-black/85 dark:text-white/90 rounded-tl-sm",
        )}
      >
        <MarkdownRenderer content={text} />
      </div>
    </div>
  );
});

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const focusTextarea = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div
      className={cn(
        "fixed top-4 right-4 bottom-4 z-40 w-120 flex flex-col",
        "rounded-2xl border border-black/10 dark:border-white/10 shadow-2xl overflow-hidden",
        "bg-white dark:bg-black",
        "transition-all duration-300 ease-in-out",
        isOpen
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-[110%] opacity-0 pointer-events-none",
      )}
    >
      {/* Header — no border-b, same bg so it blends seamlessly into messages */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold text-black/80 dark:text-white">
            AI Assistant
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black/30 dark:text-white/40 hover:text-black/60 dark:hover:text-white"
          aria-label="Close chat panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages — transparent track, thumb only */}
      <div
        ref={scrollRef}
        className={cn("flex-1 overflow-y-auto px-4 py-2 space-y-4 min-h-0")}
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
            <Bot className="w-10 h-10 text-black/10 dark:text-white/10" />
            <div>
              <p className="text-sm font-medium text-black/35 dark:text-white/40">
                How can I help?
              </p>
              <p className="text-xs mt-1 text-black/25 dark:text-white/25">
                Ask me anything about your flow diagram or ideas.
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => {
          const text = message.parts
            .map((p) => (p.type === "text" ? p.text : ""))
            .join("");
          return (
            <MessageBubble key={message.id} role={message.role} text={text} />
          );
        })}

        {isLoading && (
          <div className="flex gap-2 items-start">
            {/* <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-black/6 dark:bg-white/10">
              <Bot className="w-5 h-5 text-black/40 dark:text-white/60" />
            </div> */}
            <div className="px-3 py-2 rounded-2xl rounded-tl-sm bg-black/5 dark:bg-white/8 text-black/35 dark:text-white/40 text-sm flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Thinking…</span>
            </div>
          </div>
        )}
      </div>

      {/* Input — unified container that feels like one textarea */}
      <div className="shrink-0 p-3 border-t border-black/6 dark:border-white/8">
        {/* Parent container: clicking anywhere focuses the textarea; ring mirrors focus */}
        <div
          onClick={focusTextarea}
          className={cn(
            "flex flex-col rounded-xl border transition-all duration-150 cursor-text",
            "bg-black/4 dark:bg-white/5",
            isFocused
              ? "border-primary ring-2 ring-primary/40"
              : "border-black/10 dark:border-white/10",
          )}
        >
          {/* Context area — top slot for future file/context chips */}
          <div className="px-3 pt-2.5 text-xs text-primary dark:text-primary font-medium tracking-wide">
            CONTEXT:
          </div>

          {/* Textarea — invisible borders/bg, actual input */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything…"
            disabled={isLoading}
            rows={1}
            className={cn(
              "w-full resize-none bg-transparent border-none outline-none",
              "px-3 py-2 text-sm leading-relaxed",
              "text-black dark:text-white",
              "placeholder:text-black/25 dark:placeholder:text-white/25",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "max-h-32 overflow-y-auto",
            )}
            style={{ fieldSizing: "content" } as React.CSSProperties}
          />

          {/* Toolbar — bottom row, send button right-aligned */}
          <div className="flex items-center justify-end px-2 pb-2 pt-1">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className={cn(
                "shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors",
                input.trim() && !isLoading
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-primary-sm"
                  : "bg-black/6 dark:bg-white/8 text-black/25 dark:text-white/25 cursor-not-allowed",
              )}
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <p className="text-xs text-black/25 dark:text-white/25 mt-1.5 text-center">
          Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
