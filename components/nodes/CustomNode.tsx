'use client';

import { Handle, Position, NodeProps } from '@xyflow/react';
import { CheckCircle2, Lock, Clock } from 'lucide-react';

type CustomNodeData = {
  label: string;
  status?: 'Pending' | 'Completed' | 'Locked';
  description?: string;
};

export default function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  const getStatusIcon = () => {
    switch (data.status) {
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'Locked':
        return <Lock className="w-4 h-4 text-slate-400" />;
      default:
        return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusBg = () => {
    switch (data.status) {
      case 'Completed':
        return 'bg-emerald-50 border-emerald-200';
      case 'Locked':
        return 'bg-slate-50 border-slate-200';
      default:
        return 'bg-amber-50 border-amber-200';
    }
  };

  return (
    <div
      className={`relative rounded-lg border-2 px-4 py-3 shadow-sm transition-all duration-200 min-w-[200px] cursor-pointer ${
        selected
          ? 'border-primary shadow-lg ring-2 ring-primary/20'
          : `${getStatusBg()} hover:shadow-md hover:border-primary/50`
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-2.5 !h-2.5 !border-2 !border-background"
      />

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm">{data.label}</h3>
          {getStatusIcon()}
        </div>

        <div className="inline-flex items-center gap-1.5 rounded-full bg-background/60 px-2 py-0.5 text-xs font-medium">
          {data.status || 'Pending'}
        </div>

        {data.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {data.description}
          </p>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-2.5 !h-2.5 !border-2 !border-background"
      />
    </div>
  );
}
