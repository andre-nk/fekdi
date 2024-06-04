import { storage } from "@/firebase/config";
import { getDownloadURL, ref } from "@firebase/storage";
import { useState } from "react";

export const useCreateResult = (logUrl: string, modelUrl: string) => {
  const [log, setLog] = useState<File | null>(null);
  const [model, setModel] = useState<File | null>(null);
  const [success, setSuccess] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
          console.log(logFile);
          console.log(modelFile);

          setLog(logFile);
          setModel(modelFile);

          const formData = new FormData();
          formData.append("file", logFile);
          formData.append("pnml_file", modelFile);

          console.log(Array.from(formData.entries()));

          await fetch(
            "https://fekdi-bi.onrender.com/diagnostics-alignments-xes",
            {
              method: "POST",
              body: formData,
            }
          ).then(async (response) => {
            console.log(response);
            if (!response.ok) {
              throw new Error("Failed to create result");
            }

            const result = await response.json();
            setSuccess(result);
          });
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
