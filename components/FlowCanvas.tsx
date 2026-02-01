'use client'

import React, { useCallback } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from 'reactflow'

import CustomNode from './CustomNode'
import DockWrapper from './dock/DockWrapper'
import SimpleDock from './dock/SimpleDock'

type MyNodeData = { label?: string; onClick?: (id: string) => void }

const initialNodes = [
  { id: '1', type: 'custom', position: { x: 50, y: 50 }, data: { label: 'Click me', onClick: (id: string) => alert(`Clicked ${id}`) } },
  { id: '2', type: 'custom', position: { x: 50, y: 200 }, data: { label: 'Or me', onClick: (id: string) => console.log('clicked', id) } },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', markerEnd: { type: MarkerType.ArrowClosed } },
]

const nodeTypes = { custom: CustomNode }

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null)

  const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), [setEdges])

  return (
    <ReactFlowProvider>
      <div className="relative w-full h-full">
        <div className="absolute inset-0" style={{ width: '100%', height: '100%' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            onNodeClick={(e, node) => {
              setSelectedNodeId(node.id)
            }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-40 pointer-events-auto">
          <SimpleDock selectedNodeId={selectedNodeId} setSelectedNodeId={setSelectedNodeId} />
        </div>
      </div>
    </ReactFlowProvider>
  )
}
