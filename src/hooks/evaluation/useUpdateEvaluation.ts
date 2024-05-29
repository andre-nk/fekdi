import { db } from "@/firebase/config";
import { Evaluation } from "@/models/evaluation";
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
  }

  const updateEvaluation = async ({
    sopID,
    evaluationID,
    logID,
    modelID,
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
