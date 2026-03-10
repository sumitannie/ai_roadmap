'use client'

import React, { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import useCanvasStore from '@/stores/useCanvasStore'

type MyNodeData = {
  label?: string
  onClick?: (id: string, data?: MyNodeData) => void
}

const CustomNode: React.FC<NodeProps<MyNodeData>> = ({ id, data }) => {
  const selectedNodeId = useCanvasStore((s) => s.selectedNodeId)
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (typeof data?.onClick === 'function') {
      data.onClick(id, data)
    } else {
      // if no custom handler provided, select via store
      useCanvasStore.getState().setSelectedNodeId(id)
    }
  }

  const isSelected = selectedNodeId === id

  return (
    <div
      className={`px-3 py-2 cursor-pointer select-none rounded-lg shadow ${isSelected ? 'ring-2 ring-primary bg-primary/8 border-primary/40' : 'bg-card border border-border'}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="font-semibold text-foreground">{data?.label ?? 'Custom Node'}</div>
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="source" id="b" position={Position.Right} />
    </div>
  )
}

export default memo(CustomNode)
