import { db } from "@/firebase/config";
import { Evaluation } from "@/models/evaluation";
import { Result } from "@/models/result";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export const useUpdateEvaluation = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  interface UpdateEvaluationInput {
    sopID: string;
    evaluationID: string;
    logID?: string;
    modelID?: string;
    result?: Result;
  }

  const updateEvaluation = async ({
    sopID,
    evaluationID,
    logID,
    modelID,
    result,
  }: UpdateEvaluationInput) => {
    try {
      setSuccess(false);
      setError(null);
      setLoading(true);

      if (logID) {
        await updateDoc(doc(db, `sop/${sopID}/evaluations/${evaluationID}`), {
          updatedAt: new Date(),
          logID: logID,
        });
      }

      if (modelID) {
        await updateDoc(doc(db, `sop/${sopID}/evaluations/${evaluationID}`), {
          updatedAt: new Date(),
          modelID: modelID,
        });
      }

      if (result) {
        await updateDoc(doc(db, `sop/${sopID}/evaluations/${evaluationID}`), {
          updatedAt: new Date(),
          result: result,
        });
      }

      await updateDoc(doc(db, `sop/${sopID}`), {
        updatedAt: new Date(),
      });

      setSuccess(true);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      setSuccess(false);
    }
  };

  return { updateEvaluation, success, loading, error };
};
