"use client";
import { Handle, Position } from "@xyflow/react";

type CustomNodeProps = {
    data: {
        label:string;
        status?:string;
    };
}

export default function CustomNode({data}: CustomNodeProps){

    return(
        <div
        style={{
        padding: 12,                  // Space inside the node box
        borderRadius: 8,               // Rounded corners
        border: '2px solid #2563eb',   // Blue border
        background: '#eff6ff',         // Light blue background
        minWidth: 120,                 // Minimum width of node
        textAlign: 'center',           // Center text horizontally
         }}
        >

        <div style={{fontWeight: 'bold'}}>
            {data.label}  {/*node title */}
        </div>

        {/*Conditional rendering*/}
        
        {data.status && (
            <div
            style={{
                fontSize: 12,
                marginTop: 5,
            }}
            >
                Status: {data.status}
            </div>
        )}
        

        <Handle 
         type="target"
         position={Position.Top}
        />

        <Handle 
        type="source"
        position={Position.Bottom}
        />

        </div>
    )
}