import { db } from "@/firebase/config";
import { Evaluation } from "@/models/evaluation";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export const useCreateEvaluation = (sopID: string) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createEvaluation = async () => {
    try {
      setSuccess(false);
      setError(null);
      setLoading(true);

      const evaluation: Evaluation = {
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(collection(db, `sop/${sopID}/evaluations`), evaluation);
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

  return { createEvaluation, success, loading, error };
};
