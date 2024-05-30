export type Result = {
  alignment: Alignment[];
  cost: number;
  visitedStates: number;
  queuedStates: number;
  traversedArcs: number;
  lpSolved: number;
  fitness: number;
  bwc: number;
};

export type Alignment = {
  termA: string | null;
  termB: string | null;
};
