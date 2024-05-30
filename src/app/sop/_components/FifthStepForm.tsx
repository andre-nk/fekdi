import { Result } from "@/models/result";
import { Pane, Table } from "evergreen-ui";
import React, { MutableRefObject } from "react";

const dummyResults: Result[] = [
  {
    alignment: [
      { termA: ">>", termB: "register request" },
      { termA: ">>", termB: null },
      { termA: "examine thoroughly", termB: "examine thoroughly" },
      { termA: "check ticket", termB: "check ticket" },
      { termA: "decide", termB: "decide" },
      { termA: ">>", termB: null },
      { termA: "reject request", termB: "reject request" },
    ],
    cost: 10002,
    visitedStates: 7,
    queuedStates: 22,
    traversedArcs: 22,
    lpSolved: 1,
    fitness: 0.8888888888888888,
    bwc: 90002,
  },
  {
    alignment: [
      { termA: "register request", termB: "register request" },
      { termA: ">>", termB: null },
      { termA: "check ticket", termB: "check ticket" },
      { termA: "examine casually", termB: "examine casually" },
      { termA: ">>", termB: "decide" },
      { termA: ">>", termB: null },
      { termA: "pay compensation", termB: "pay compensation" },
    ],
    cost: 10002,
    visitedStates: 7,
    queuedStates: 23,
    traversedArcs: 23,
    lpSolved: 3,
    fitness: 0.8888888888888888,
    bwc: 90002,
  },
  {
    alignment: [
      { termA: "register request", termB: "register request" },
      { termA: ">>", termB: null },
      { termA: ">>", termB: "examine casually" },
      { termA: "check ticket", termB: "check ticket" },
      { termA: "decide", termB: "decide" },
      { termA: "reinitiate request", termB: ">>" },
      { termA: ">>", termB: null },
      { termA: "pay compensation", termB: "pay compensation" },
    ],
    cost: 20002,
    visitedStates: 8,
    queuedStates: 27,
    traversedArcs: 27,
    lpSolved: 6,
    fitness: 0.8,
    bwc: 100002,
  },
  {
    alignment: [
      { termA: "register request", termB: "register request" },
      { termA: ">>", termB: null },
      { termA: "check ticket", termB: "check ticket" },
      { termA: "examine thoroughly", termB: "examine thoroughly" },
      { termA: "decide", termB: "decide" },
      { termA: ">>", termB: null },
      { termA: "reject request", termB: "reject request" },
    ],
    cost: 2,
    visitedStates: 7,
    queuedStates: 24,
    traversedArcs: 24,
    lpSolved: 1,
    fitness: 1.0,
    bwc: 100002,
  },
  {
    alignment: [
      { termA: "register request", termB: "register request" },
      { termA: ">>", termB: null },
      { termA: "examine casually", termB: "examine casually" },
      { termA: "check ticket", termB: "check ticket" },
      { termA: "decide", termB: "decide" },
      { termA: "reinitiate the request for real", termB: ">>" },
      { termA: ">>", termB: "reinitiate request" },
      { termA: ">>", termB: null },
      { termA: "check ticket", termB: "check ticket" },
      { termA: "examine casually", termB: "examine casually" },
      { termA: "decide", termB: "decide" },
      { termA: ">>", termB: "reinitiate request" },
      { termA: ">>", termB: null },
      { termA: "examine casually", termB: "examine casually" },
      { termA: "check ticket", termB: "check ticket" },
      { termA: "decide", termB: "decide" },
      { termA: ">>", termB: null },
      { termA: "reject request", termB: "reject request" },
    ],
    cost: 30004,
    visitedStates: 18,
    queuedStates: 59,
    traversedArcs: 59,
    lpSolved: 10,
    fitness: 0.8235294117647058,
    bwc: 170002,
  },
  {
    alignment: [
      { termA: "register request", termB: "register request" },
      { termA: ">>", termB: null },
      { termA: ">>", termB: "examine casually" },
      { termA: "check ticket", termB: "check ticket" },
      { termA: ">>", termB: "decide" },
      { termA: "decide something", termB: ">>" },
      { termA: ">>", termB: null },
      { termA: "pay compensation", termB: "pay compensation" },
    ],
    cost: 30002,
    visitedStates: 8,
    queuedStates: 25,
    traversedArcs: 25,
    lpSolved: 2,
    fitness: 0.6666666666666667,
    bwc: 90002,
  },
];

export default function FifthStepForm({
  evaluationID,
  targetRef,
}: {
  evaluationID: string;
  targetRef: MutableRefObject<HTMLDivElement>;
}) {
  return (
    <div
      className="w-full h-full overflow-x-scroll overflow-y-scroll flex flex-col gap-8"
      ref={targetRef}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold px-6">Evaluation Results</h2>
        <h3 className="text-md">Version: {evaluationID.substring(0, 4)}</h3>
      </div>
      {dummyResults.map((res, index) => {
        return (
          <Pane key={index} className="flex flex-col gap-4">
            <Table className="w-full flex justify-start">
              {res.alignment.map((pair, index) => {
                return (
                  <Table.Body key={index}>
                    <Table.Row
                      height={32}
                      className="flex justify-center items-center"
                    >
                      <Table.TextCell className="text-center text-lg">
                        {pair.termA}
                      </Table.TextCell>
                    </Table.Row>
                    <Table.Row
                      height={32}
                      className="flex justify-center items-center"
                    >
                      <Table.TextCell className="text-center text-lg">
                        {pair.termB ?? "None"}
                      </Table.TextCell>
                    </Table.Row>
                  </Table.Body>
                );
              })}
            </Table>
            <div className="flex flex-col gap-2 text-xs w-fit rounded-md items-start p-4 mx-6 bg-blue-50">
              <p>Cost: {res.cost}</p>
              <p>Visited States: {res.visitedStates}</p>
              <p>Queued States: {res.queuedStates}</p>
              <p>Traversed Arcs: {res.traversedArcs}</p>
              <p>LP Solved: {res.lpSolved}</p>
              <p>Fitness: {res.fitness}</p>
              <p>BWC: {res.bwc}</p>
            </div>
          </Pane>
        );
      })}
    </div>
  );
}
