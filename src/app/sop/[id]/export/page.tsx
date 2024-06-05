"use client";

import { useResultContext } from "@/context/ResultContext";
import { Result } from "@/models/result";
import { Button, SavedIcon } from "evergreen-ui";
import { useSearchParams } from "next/navigation";
import React, { use } from "react";
import { usePDF, Margin } from "react-to-pdf";

export default function ExportResultPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const results = useResultContext((state) => state.results);

  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: `${id}-result-${Date.now()}.pdf`,
    page: { margin: Margin.MEDIUM },
  });

  return (
    <div className="flex flex-col p-6 gap-8">
      <div
        className="h-full overflow-y-scroll flex flex-col gap-8"
        ref={targetRef}
      >
        <div className="flex flex-col gap-2 px-6">
          <h2 className="text-xl font-semibold">Evaluation Results</h2>
          <h3 className="text-md">Version: {id?.substring(0, 4)}</h3>
        </div>
        {results.map((res, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              <div className="inline-flex w-fit">
                {res.alignment.map((align, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col text-xs w-[12vw] bg-white justify-center items-center border border-gray-300"
                    >
                      <p className="flex-1 py-2">{align.termA}</p>
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <p className="flex-1 py-2">{align.termB}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2 text-xs w-fit rounded-md items-start p-4 bg-blue-50">
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
      <Button
        size="medium"
        appearance="primary"
        backgroundColor="#0021A5"
        className="w-[10vw]"
        iconBefore={<SavedIcon size={12} color="white" />}
        onClick={() => {
          toPDF();
        }}
      >
        <p className="text-white font-medium">Save as PDF</p>
      </Button>
    </div>
  );
}
