'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { useReactFlow, Node, Edge } from 'reactflow'

type Props = {
  selectedNodeId: string | null
  setSelectedNodeId: (id: string | null) => void
}

export default function DockWrapper({ selectedNodeId, setSelectedNodeId }: Props) {
  // Deprecated placeholder kept for compatibility — SimpleDock is used instead.
  return null
}
