'use client'

import React, { useEffect, useRef } from 'react'
import useCanvasStore from '@/stores/useCanvasStore'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogPrimitive,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function NodeCreateDialog() {
  const isOpen   = useCanvasStore((s) => s.isCreateDialogOpen)
  const label    = useCanvasStore((s) => s.createDialogDraftLabel)
  const body     = useCanvasStore((s) => s.createDialogDraftBody)
  const setLabel = useCanvasStore((s) => s.setCreateDialogLabel)
  const setBody  = useCanvasStore((s) => s.setCreateDialogBody)
  const create   = useCanvasStore((s) => s.createNodeFromDialog)
  const close    = useCanvasStore((s) => s.closeCreateDialog)

  const labelRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isOpen) labelRef.current?.focus()
  }, [isOpen])

  const onSubmit = () => {
    if (!label?.trim()) return
    create()
    close()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      onSubmit()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) close() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create node</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-1">
          {/* Heading */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="node-label">
              Heading <span className="text-destructive">*</span>
            </label>
            <Input
              id="node-label"
              ref={labelRef}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSubmit()
                onKeyDown(e)
              }}
              placeholder="Node heading"
              autoComplete="off"
            />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground" htmlFor="node-body">
              Body
              <span className="ml-1.5 font-normal text-muted-foreground/60">
                optional &middot; markdown supported
              </span>
            </label>
            <textarea
              id="node-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={"Add a description or use markdown…\n\n- Item one\n- Item two"}
              rows={4}
              className="border-input placeholder:text-muted-foreground dark:bg-input/30 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none resize-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50"
            />
            <p className="text-xs text-muted-foreground/50">
              Tip: <kbd className="font-mono">Ctrl</kbd>+<kbd className="font-mono">Enter</kbd> to create
            </p>
          </div>
        </div>

        <DialogFooter>
          <DialogPrimitive.Close asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogPrimitive.Close>
          <Button onClick={onSubmit} disabled={!label?.trim()}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
