import { useMemo } from "react";
import ReactFlow, { Background, Panel } from "reactflow";
import "reactflow/dist/style.css";
import SOPNode from "./SOPNode";

const edges = [
  { id: "1-4", source: "1", target: "4" },
  { id: "3-4", source: "3", target: "4" },
  { id: "4-5", source: "4", target: "5" },
];

const nodes = [
  {
    id: "1",
    data: { label: "1. Input Event Log", step: 1 },
    position: { x: 275, y: 0 },
    type: "sop",
  },
  {
    id: "3",
    data: { label: "2. Input Petrinet", step: 3 },
    position: { x: 300, y: 100 },
    type: "sop",
  },
  {
    id: "4",
    data: { label: "3. Conformance Check", step: 4 },
    position: { x: 500, y: 50 },
    type: "sop",
  },
  {
    id: "5",
    data: { label: "4. Evaluation", step: 5 },
    position: { x: 750, y: 50 },
    type: "sop",
  },
];

function SOPNodes() {
  const nodeTypes = useMemo(() => ({ sop: SOPNode }), []);

  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        panOnDrag={false}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default SOPNodes;
