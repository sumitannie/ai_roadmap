'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useRef, useState } from 'react'
import { Bot, Send, User, X, MessageSquare, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return
    sendMessage({ text: trimmed })
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <>
      {/* Floating panel — fixed over the canvas, slides in/out from the right */}
      <div
        className={cn(
          'fixed top-4 right-4 bottom-4 z-40 w-120 flex flex-col',
          'rounded-xl border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden',
          'bg-white dark:bg-gray-900',
          'transition-all duration-300 ease-in-out',
          isOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : 'translate-x-[110%] opacity-0 pointer-events-none',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">AI Assistant</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="Close chat panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 py-8">
              <Bot className="w-10 h-10 text-gray-300 dark:text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">How can I help?</p>
                <p className="text-xs mt-1 text-gray-400 dark:text-gray-500">
                  Ask me anything about your flow diagram or ideas.
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => {
            const isUser = message.role === 'user'
            const text = message.parts
              .map((p) => (p.type === 'text' ? p.text : ''))
              .join('')

            return (
              <div
                key={message.id}
                className={cn('flex gap-2 items-start', isUser ? 'flex-row-reverse' : 'flex-row')}
              >
                <div
                  className={cn(
                    'shrink-0 w-7 h-7 rounded-full flex items-center justify-center',
                    isUser ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
                  )}
                >
                  {isUser ? (
                    <User className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                  )}
                </div>

                <div
                  className={cn(
                    'max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words',
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-tl-sm',
                  )}
                >
                  {text}
                </div>
              </div>
            )
          })}

          {isLoading && (
            <div className="flex gap-2 items-start">
              <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <Bot className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="px-3 py-2 rounded-2xl rounded-tl-sm bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Thinking…</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 p-3 bg-white dark:bg-gray-900">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything… (Enter to send)"
              disabled={isLoading}
              rows={1}
              className={cn(
                'flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm',
                'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'max-h-32 overflow-y-auto leading-relaxed',
              )}
              style={{ fieldSizing: 'content' } as React.CSSProperties}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={cn(
                'shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors',
                input.trim() && !isLoading
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed',
              )}
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 text-center">
            Shift+Enter for new line
          </p>
        </div>
      </div>
    </>
  )
}
