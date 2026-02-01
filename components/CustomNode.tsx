'use client'

import React, { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'

type MyNodeData = {
  label?: string
  onClick?: (id: string, data?: MyNodeData) => void
}

const CustomNode: React.FC<NodeProps<MyNodeData>> = ({ id, data }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (typeof data?.onClick === 'function') {
      data.onClick(id, data)
    } else {
      console.log('Node clicked', id)
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow px-3 py-2 cursor-pointer select-none" onClick={handleClick} role="button" tabIndex={0}>
      <div className="font-semibold text-slate-800">{data?.label ?? 'Custom Node'}</div>
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="source" id="b" position={Position.Right} />
    </div>
  )
}

export default memo(CustomNode)
