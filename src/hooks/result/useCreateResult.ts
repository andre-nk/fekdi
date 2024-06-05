import { Alignment, Result } from "@/models/result";
import { useState } from "react";
import { useUpdateEvaluation } from "../evaluation/useUpdateEvaluation";

export const useCreateResult = (
  sopID: string,
  evaluationID: string,
  logUrl: string,
  modelUrl: string
) => {
  const [success, setSuccess] = useState<Result[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { updateEvaluation } = useUpdateEvaluation();

  const handleResponse = async (response: any) => {
    if (!response.ok) {
      throw new Error("Failed to create result");
    }

    let results: Result[] = [];
    const json = await response.json();

    results = json.result.map((res: any) => {
      let alignments: Alignment[] = [];

      res.alignment.forEach((align: any) => {
        alignments.push({ termA: align[0], termB: align[1] });
      });

      let result: Result = {
        alignment: alignments,
        cost: res.cost,
        visitedStates: res.visited_states,
        queuedStates: res.queued_states,
        traversedArcs: res.traversed_arcs,
        lpSolved: res.lp_solved,
        fitness: res.fitness,
        bwc: res.bwc,
      };

      return result;
    });

    await updateEvaluation({
      sopID: sopID,
      evaluationID: evaluationID,
      result: results,
    });

    setSuccess(results);
  };

  const createResult = async () => {
    try {
      setSuccess(null);
      setError(null);
      setLoading(true);

      const logPromise = new Promise<File>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = () => {
          const blob = xhr.response as Blob;
          const file = new File([blob], logUrl);
          resolve(file);
        };
        xhr.onerror = () => {
          reject(new Error("Failed to fetch log file"));
        };
        xhr.open("GET", logUrl);
        xhr.send();
      });

      const modelPromise = new Promise<File>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = () => {
          const blob = xhr.response as Blob;
          const file = new File([blob], modelUrl);
          resolve(file);
        };
        xhr.onerror = () => {
          reject(new Error("Failed to fetch model file"));
        };
        xhr.open("GET", modelUrl);
        xhr.send();
      });

      Promise.all([logPromise, modelPromise])
        .then(async ([logFile, modelFile]) => {
          if (logFile.type === "text/csv") {
            const formData = new FormData();
            formData.append("file", logFile);
            formData.append("pnml_file", modelFile);
            formData.append("sep", ";");
            formData.append("case_id", "case_id");
            formData.append("activity_key", "activity");
            formData.append("timestamp_key", "timestamp");

            await fetch(
              "https://fekdi-bi.onrender.com/diagnostics-alignments-csv",
              {
                method: "POST",
                body: formData,
              }
            ).then(async (response) => {
              await handleResponse(response);
            });
          } else if (logFile.type === "text/xes") {
            const formData = new FormData();
            formData.append("file", logFile);
            formData.append("pnml_file", modelFile);

            await fetch(
              "https://fekdi-bi.onrender.com/diagnostics-alignments-xes",
              {
                method: "POST",
                body: formData,
              }
            ).then(async (response) => {
              await handleResponse(response);
            });
          }
        })
        .catch((error: Error) => {
          setError(error.message);
        });

      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      setSuccess(null);
    }
  };

  return { success, loading, error, createResult };
};
