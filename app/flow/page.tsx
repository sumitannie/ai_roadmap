'use client'

import React from 'react'
import FlowCanvas from '../../components/FlowCanvas'

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <h1 className="absolute top-3 left-3 z-50 p-3 text-xl font-semibold bg-white/60 rounded">React Flow Demo</h1>
      <div className="absolute inset-0">
        <FlowCanvas />
      </div>
    </main>
  )
}
