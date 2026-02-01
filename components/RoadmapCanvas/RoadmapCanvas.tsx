'use client';

import { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  NodeTypes,
} from '@xyflow/react';
import { Plus, Wand2 } from 'lucide-react';
import CustomNode from '@/components/nodes/CustomNode';

type CustomNodeData = {
  label: string;
  status?: 'Pending' | 'Completed' | 'Locked';
  description?: string;
};

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

export default function RoadmapCanvas() {
  const [nodes, setNodes] = useState<Node<CustomNodeData>[]>([
    {
      id: 'n1',
      type: 'custom',
      position: { x: 0, y: 0 },
      data: { label: 'Learn Basics', status: 'Pending', description: 'Master fundamentals' },
    },
    {
      id: 'n2',
      type: 'custom',
      position: { x: 300, y: 200 },
      data: { label: 'Advanced Concepts', status: 'Locked', description: 'Deep dive' },
    },
  ]);

  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { strokeWidth: 2 } },
          eds
        )
      ),
    []
  );

  const createNode = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: crypto.randomUUID(),
        type: 'custom',
        position: { x: Math.random() * 500, y: Math.random() * 400 },
        data: { label: 'New Topic', status: 'Pending' },
      },
    ]);
  };

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 flex gap-2 rounded-lg bg-card border px-3 py-2 shadow-md">
        <button
          onClick={createNode}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary text-primary-foreground px-3 py-1.5 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Node
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-1.5 text-sm font-medium">
          <Wand2 className="w-4 h-4" />
          Auto Layout
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        panOnDrag
        zoomOnScroll
        zoomOnPinch
      >
        <Background gap={24} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
