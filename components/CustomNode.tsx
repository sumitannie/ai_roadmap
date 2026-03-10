'use client'

import React, { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import ReactMarkdown from 'react-markdown'
import { MoreVertical } from 'lucide-react'
import useCanvasStore from '@/stores/useCanvasStore'

export type MyNodeData = {
  /** Card heading */
  label?: string
  /**
   * Card body — can be:
   *  - a markdown string  (parsed and rendered)
   *  - a ReactNode        (rendered as-is)
   *  - a string[]         (rendered as a <ul> list)
   */
  body?: React.ReactNode | string | string[]
  onClick?: (id: string, data?: MyNodeData) => void
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Detect plain markdown string (not a React element, not an array) */
function isMarkdownString(v: unknown): v is string {
  return typeof v === 'string'
}

/** Render the body in the appropriate way */
function NodeBody({ body }: { body: MyNodeData['body'] }) {
  if (!body) return null

  // string[] → bullet list
  if (Array.isArray(body)) {
    return (
      <ul className="mt-1.5 space-y-0.5 list-disc list-inside">
        {body.map((item, i) => (
          <li key={i} className="text-xs text-muted-foreground leading-snug">
            {item}
          </li>
        ))}
      </ul>
    )
  }

  // string → parse as markdown
  if (isMarkdownString(body)) {
    return (
      <div className="mt-1.5 prose prose-xs prose-neutral dark:prose-invert max-w-none
                      [&>p]:text-xs [&>p]:text-muted-foreground [&>p]:leading-snug [&>p]:my-0.5
                      [&>ul]:text-xs [&>ul]:text-muted-foreground [&>ul]:my-0.5 [&>ul]:list-disc [&>ul]:list-inside [&>ul>li]:leading-snug
                      [&>ol]:text-xs [&>ol]:text-muted-foreground [&>ol]:my-0.5 [&>ol]:list-decimal [&>ol]:list-inside [&>ol>li]:leading-snug
                      [&>h1]:text-sm [&>h1]:font-semibold [&>h1]:my-0.5
                      [&>h2]:text-xs [&>h2]:font-semibold [&>h2]:my-0.5
                      [&>h3]:text-xs [&>h3]:font-medium [&>h3]:my-0.5
                      [&>strong]:font-semibold [&>code]:text-xs [&>code]:bg-muted [&>code]:px-0.5 [&>code]:rounded">
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    )
  }

  // ReactNode → render directly
  return (
    <div className="mt-1.5 text-xs text-muted-foreground leading-snug nodrag">
      {body}
    </div>
  )
}

// ---------------------------------------------------------------------------
// CustomNode
// ---------------------------------------------------------------------------

const CustomNode: React.FC<NodeProps<MyNodeData>> = ({ id, data }) => {
  const selectedNodeId = useCanvasStore((s) => s.selectedNodeId)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (typeof data?.onClick === 'function') {
      data.onClick(id, data)
    } else {
      useCanvasStore.getState().setSelectedNodeId(id)
    }
  }

  const isSelected = selectedNodeId === id

  return (
    <div
      className={`
        min-w-[160px] max-w-[280px] px-3 py-2.5
        cursor-pointer select-none rounded-sm shadow-sm
        transition-shadow duration-150
        ${isSelected
          ? 'ring-2 ring-primary bg-primary/8 border border-primary/40 shadow-md'
          : 'bg-card border border-border hover:shadow-md'
        }
      `}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {/* Header row: heading + 3-dot menu */}
      <div className="flex items-start justify-between gap-2">
        {data?.label && (
          <div className="font-semibold text-sm text-primary capitalize leading-snug text-glow-primary-sm">
            {data.label}
          </div>
        )}
        {/* 3-dot menu */}
        <MoreVertical className="size-3.5 shrink-0 text-muted-foreground/50" />
      </div>

      {/* Body */}
      <NodeBody body={data?.body} />

      {/* Handles — left/right, kept as-is */}
      <Handle type="target" id="a" position={Position.Left} />
      <Handle type="source" id="b" position={Position.Right} />
    </div>
  )
}

export default memo(CustomNode)
