import { db } from "@/firebase/config";
import { Evaluation } from "@/models/evaluation";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export const useUpdateEvaluation = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateEvaluation = async (
    sopID: string,
    evaluationID: string,
    logID?: string,
    modelID?: string
  ) => {
    try {
      setSuccess(false);
      setError(null);
      setLoading(true);

      await updateDoc(doc(db, `sop/${sopID}/evaluations/${evaluationID}`), {
        updatedAt: new Date(),
        logID,
        modelID,
      });

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
