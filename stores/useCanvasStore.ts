import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Node, Edge } from 'reactflow'

type CanvasState = {
  nodes: Node[]
  edges: Edge[]
  selectedNodeId: string | null
  // dialog UI state (transient)
  isCreateDialogOpen: boolean
  createDialogDraftLabel: string
  lastCreatedNodeId?: string
  setNodes: (nodes: Node[]) => void
  setEdges: (edges: Edge[]) => void
  addNode: (node: Node) => void
  removeNode: (id: string) => void
  addEdge: (edge: Edge) => void
  removeEdgesForNode: (id: string) => void
  setSelectedNodeId: (id: string | null) => void
  // dialog actions
  openCreateDialog: (initial?: string) => void
  closeCreateDialog: () => void
  setCreateDialogLabel: (label: string) => void
  createNodeFromDialog: (position?: { x: number; y: number }) => string | null
  clearLastCreatedNodeId: () => void
  exportState: () => { nodes: Node[]; edges: Edge[]; selectedNodeId: string | null }
  importState: (obj: { nodes?: Node[]; edges?: Edge[]; selectedNodeId?: string | null }) => void
}

export const useCanvasStore = create<CanvasState>()(
  devtools(
    immer((set, get) => ({
      nodes: [],
      edges: [],
      selectedNodeId: null,
      isCreateDialogOpen: false,
      createDialogDraftLabel: '',
      lastCreatedNodeId: undefined,
      setNodes: (nodes: Node[]) => set(() => ({ nodes })),
      setEdges: (edges: Edge[]) => set(() => ({ edges })),
      addNode: (node: Node) => set((state) => { state.nodes.push(node) }),
      removeNode: (id: string) => set((state) => {
        state.nodes = state.nodes.filter((n: Node) => n.id !== id)
        state.edges = state.edges.filter((e: Edge) => e.source !== id && e.target !== id)
        if (state.selectedNodeId === id) state.selectedNodeId = null
      }),
      addEdge: (edge: Edge) => set((state) => { state.edges.push(edge) }),
      removeEdgesForNode: (id: string) => set((state) => { state.edges = state.edges.filter((e: Edge) => e.source !== id && e.target !== id) }),
      setSelectedNodeId: (id: string | null) => set(() => ({ selectedNodeId: id })),
      openCreateDialog: (initial = '') => set(() => ({ isCreateDialogOpen: true, createDialogDraftLabel: initial })),
      closeCreateDialog: () => set(() => ({ isCreateDialogOpen: false, createDialogDraftLabel: '' })),
      setCreateDialogLabel: (label: string) => set(() => ({ createDialogDraftLabel: label })),
      createNodeFromDialog: (position) => {
        const draft = get().createDialogDraftLabel?.trim()
        if (!draft) return null
        const id = String(Date.now())
        const pos = position ?? { x: 250, y: 150 }
        const node: Node = { id, type: 'custom', position: pos, data: { label: draft, onClick: (nid: string) => get().setSelectedNodeId(nid) } }
        set((state) => {
          state.nodes.push(node)
          // state.selectedNodeId = id
          state.lastCreatedNodeId = id
          state.isCreateDialogOpen = false
          state.createDialogDraftLabel = ''
        })
        return id
      },
      clearLastCreatedNodeId: () => set(() => ({ lastCreatedNodeId: undefined })),
      exportState: () => {
        const s = get()
        return { nodes: s.nodes, edges: s.edges, selectedNodeId: s.selectedNodeId }
      },
      importState: (obj: { nodes?: Node[]; edges?: Edge[]; selectedNodeId?: string | null }) => set(() => ({
        nodes: obj.nodes ?? [],
        edges: obj.edges ?? [],
        selectedNodeId: obj.selectedNodeId ?? null,
      })),
    })),
    { name: 'CanvasStore' },
  ),
)

export default useCanvasStore
