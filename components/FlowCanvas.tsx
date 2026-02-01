"use client";

import React, { useCallback } from "react";
import { useReactFlow } from "reactflow";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

import CustomNode from "./CustomNode";
import DockWrapper from "./dock/DockWrapper";
import SimpleDock from "./dock/SimpleDock";
import useCanvasStore from "@/stores/useCanvasStore";
import NodeCreateDialog from "./NodeCreateDialog";

type MyNodeData = { label?: string; onClick?: (id: string) => void };

const initialNodes = [
  {
    id: "1",
    type: "custom",
    position: { x: 50, y: 50 },
    data: {
      label: "Click me",
      onClick: (id: string) => alert(`Clicked ${id}`),
    },
  },
  {
    id: "2",
    type: "custom",
    position: { x: 50, y: 200 },
    data: {
      label: "Or me",
      onClick: (id: string) => console.log("clicked", id),
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: { type: MarkerType.ArrowClosed },
  },
];

const nodeTypes = { custom: CustomNode };

export default function FlowCanvas() {
  // guard: React Flow must only render in the browser
  if (typeof window === "undefined") return null;
  const nodes = useCanvasStore((s) => s.nodes);
  const edges = useCanvasStore((s) => s.edges);
  const setNodes = useCanvasStore((s) => s.setNodes);
  const setEdges = useCanvasStore((s) => s.setEdges);
  const setSelectedNodeId = useCanvasStore((s) => s.setSelectedNodeId);
  const selectedNodeId = useCanvasStore((s) => s.selectedNodeId);
  const lastCreatedNodeId = useCanvasStore((s: any) => s.lastCreatedNodeId);
  const clearLastCreatedNodeId = useCanvasStore(
    (s: any) => s.clearLastCreatedNodeId,
  );
  const rf = useReactFlow();

  React.useEffect(() => {
    if (!lastCreatedNodeId) return;
    const node = nodes.find((n) => n.id === lastCreatedNodeId);
    if (node) {
      try {
        rf.setCenter(node.position.x, node.position.y, { duration: 300 });
      } catch (err) {
        // ignore
      }
    }
    // setSelectedNodeId(lastCreatedNodeId)
    clearLastCreatedNodeId();
  }, [lastCreatedNodeId, nodes, rf, clearLastCreatedNodeId]);

  const onConnect = useCallback(
    (params: any) => {
      const id = `e-${Date.now()}`;
      const newEdge = {
        id,
        source: params.source,
        target: params.target,
        markerEnd: { type: MarkerType.ArrowClosed },
      };
      setEdges(edges.concat(newEdge));
    },
    [setEdges, edges],
  );

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes) => {
            const next = applyNodeChanges(changes as any, nodes);
            setNodes(next);
          }}
          onEdgesChange={(changes) => {
            const next = applyEdgeChanges(changes as any, edges);
            setEdges(next);
          }}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          onNodeClick={(e, node) => {
            setSelectedNodeId(node.id);
          }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-40 pointer-events-auto">
        <SimpleDock />
      </div>
      <NodeCreateDialog />
    </div>
  );
}
