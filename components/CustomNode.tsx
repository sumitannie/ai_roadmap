'use client'

import React, { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import styles from './CustomNode.module.css'

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
    <div className={styles.node} onClick={handleClick} role="button" tabIndex={0}>
      <div className={styles.label}>{data?.label ?? 'Custom Node'}</div>
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="source" id="b" position={Position.Right} />
    </div>
  )
}

export default memo(CustomNode)
