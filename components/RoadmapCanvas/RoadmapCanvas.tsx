"use client";
import { useState, useCallback } from "react";

import { 
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Connection,
  Node,
} from '@xyflow/react';

import CustomNode from "../nodes/CustomNode";

const nodeTypes = {
  custom: CustomNode,
};


export default function RoadmapCanvas(){
  const [nodes, setNodes] = useState([
    {
      id: 'n1',
      type: 'custom',
      position: {x: 0, y: 0},
      data: {label: 'HTML', status: 'Pending'},
    },
    {
      id: 'n2',
      type: 'custom',
      position: {x: 0, y: 100},
      data: { label: 'JavaScript', status: 'Locked'},
    }
  ]);

  const [edges, setEdges] = useState<EdgeChange[]>([] as any);

  const createNode = (label: String) => {
    const newNode = { //this represents one node
      id: crypto.randomUUID(),
      type: 'custom', //tells react flow to use CustomNode component to render this node
     position: {
      x: Math.random() * 400,
      y: Math.random() * 400,
     },

     data: {
      label,
      status: 'pending'
     },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);

    //setNodes() updates react state. (prevNodes) => ... React gives us the current nodes array, we must return a new array
  } ;


  const connectNodes = (sourceId: string, targetId: string) => {
    const newEdge = {
       id: `{sourceId}-{targetId}`,
       source: sourceId,
       target: targetId,
       animated: true,
    };

    setEdges((prevEdges) => [...prevEdges, newEdge]);
  };


  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)
  ), [] );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => 
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)
  ), [] );


  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [] );


    // node event listeners

    const onNodeClick = (_: any, node: Node) => {
      console.log('Node Clicked:', node);
      
    };
    
    const onNodeDragStop = (_: any, node: Node) => {
      console.log('Node drag stopped: ', node);
      
    };
  
    const onSelectionChange = (selection: { nodes: Node[] }) => {
      console.log('Seleted node: ', selection.nodes);
      
    };

  
    return(
      <div style={{width: '100vw', height: '100vh'}}>

        <div>
          <button 
          onClick={() => createNode('New topic')}
          style={{
            padding: '8px 12px',
            background: '#2563eb',
            color: 'white',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
          }}
          >
           Create Node
          </button>

        </div>

        <div>
          <button onClick={() => {
            createNode('New Node n1');
            createNode('New Node n2');
          }}
          
          style={{background: 'lightgrey', text: 'white', borderRadius: '10px'}}
          >
            Add Nodes
          </button>
          <br />
          <button onClick={() => connectNodes(nodes[0].id, nodes[1].id)}
          style={{background: 'lightgrey', text: 'white', borderRadius: '10px'}}
          >
            Connect First Two Nodes
          </button>
        </div>

        <ReactFlow 
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodesConnectable={true}

        onNodeClick={onNodeClick}
        onNodeDragStop={onNodeDragStop}
        onSelectionChange={onSelectionChange}

        fitView
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        minZoom={0.7}
        maxZoom={2}

        style={{ backgroundColor: 'lightblue'}}
        />

      </div>
    )
}