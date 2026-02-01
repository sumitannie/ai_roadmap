'use client'

import React, { useEffect, useRef } from 'react'
import useCanvasStore from '@/stores/useCanvasStore'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogPrimitive } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function NodeCreateDialog() {
  const isOpen = useCanvasStore((s: any) => s.isCreateDialogOpen)
  const label = useCanvasStore((s: any) => s.createDialogDraftLabel)
  const setLabel = useCanvasStore((s: any) => s.setCreateDialogLabel)
  const create = useCanvasStore((s: any) => s.createNodeFromDialog)
  const close = useCanvasStore((s: any) => s.closeCreateDialog)

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const onSubmit = () => {
    if (!label?.trim()) return
    const id = create()
    // ensure dialog closed
    close()
    return id
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => { if (!open) close() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create node</DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <Input ref={inputRef} value={label} onChange={(e: any) => setLabel(e.target.value)} placeholder="Node name" onKeyDown={(e: any) => { if (e.key === 'Enter') onSubmit() }} />
        </div>

        <DialogFooter>
          <DialogPrimitive.Close asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogPrimitive.Close>
          <Button onClick={onSubmit} disabled={!label?.trim()}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
