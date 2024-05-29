import React, { ReactNode } from "react";
import { Handle, Position } from "reactflow";

export default function SOPNode({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-md py-2 px-3 border border-gray-500">
      <Handle type="source" position={Position.Right} />
      <p className="text-sm">{data.label}</p>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
