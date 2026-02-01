'use client'

import React from 'react'
import { useReactFlow } from 'reactflow'
import styles from './FlowToolbar.module.css'

export default function FlowToolbar() {
  const rf = useReactFlow()

  const addNode = () => {
    const id = String(Date.now())
    rf.setNodes((nds) =>
      nds.concat({
        id,
        type: 'custom',
        position: { x: 250, y: 150 },
        data: { label: `Node ${id}`, onClick: (nodeId: string) => alert(`Clicked ${nodeId}`) },
      }),
    )
  }

  const fit = () => rf.fitView()

  const exportJson = async () => {
    const obj = rf.toObject()
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'graph.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={styles.toolbar}>
      <button onClick={addNode}>+ Node</button>
      <button className="secondary" onClick={fit}>
        Fit
      </button>
      <button className="secondary" onClick={exportJson}>
        Export
      </button>
    </div>
  )
}
