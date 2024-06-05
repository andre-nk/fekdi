import { Result } from "@/models/result";
import React from "react";

export default function FourthStepForm({
  evaluationID,
  results,
}: {
  evaluationID: string;
  results: Result[];
}) {
  console.log(results);

  return (
    <div className="h-full overflow-y-scroll flex flex-col gap-8">
      <div className="flex flex-col gap-2 px-6">
        <h2 className="text-xl font-semibold">Evaluation Results</h2>
        <h3 className="text-md">Version: {evaluationID.substring(0, 4)}</h3>
      </div>
      {results.map((res, index) => {
        return (
          <div key={index} className="flex flex-col gap-4">
            <div className="inline-flex w-fit">
              {res.alignment.map((align, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col text-xs w-[12vw] justify-center items-center border border-gray-300"
                  >
                    <p className="flex-1 py-2">{align.termA}</p>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <p className="flex-1 py-2">{align.termB}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 text-xs w-fit rounded-md items-start p-4 mx-6 bg-blue-50">
              <p>Cost: {res.cost}</p>
              <p>Visited States: {res.visitedStates}</p>
              <p>Queued States: {res.queuedStates}</p>
              <p>Traversed Arcs: {res.traversedArcs}</p>
              <p>LP Solved: {res.lpSolved}</p>
              <p>Fitness: {res.fitness}</p>
              <p>BWC: {res.bwc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
