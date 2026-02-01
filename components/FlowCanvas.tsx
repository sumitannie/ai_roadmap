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
import FlowToolbar from './FlowToolbar'

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

  const onConnect = useCallback((params: any) => setEdges((eds: any) => addEdge(params, eds)), [setEdges])

  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: '80vh' }}>
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes} fitView>
          <Background />
          <Controls />
          <Panel position="top-left">
            <FlowToolbar />
          </Panel>
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  )
}
