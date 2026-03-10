'use client'

import React, { useState } from 'react'
import FlowCanvas from '../../components/FlowCanvas'
import ChatPanel from '../../components/ChatPanel'
import { MessageSquare } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function Page() {
  const [isChatOpen, setIsChatOpen] = useState(true)

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {/* Title */}
      <h1 className="absolute top-3 left-3 z-50 p-3 text-xl font-semibold bg-white/60 dark:bg-black/40 dark:text-white rounded pointer-events-none">
        React Flow Demo
      </h1>

      {/* AI Chat open button — shown when panel is closed */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="absolute top-3 right-3 z-50 flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground glow-primary-sm text-sm font-medium rounded-lg shadow transition-colors"
          aria-label="Open AI chat"
        >
          <MessageSquare className="w-4 h-4" />
          <span>AI Chat</span>
        </button>
      )}

      {/* Full-screen canvas — never pushed or resized */}
      <div className="absolute inset-0">
        <FlowCanvas />
      </div>

      {/* Floating chat panel — overlays the canvas */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  )
}
