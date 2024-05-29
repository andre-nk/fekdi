import { db } from "@/firebase/config";
import { Evaluation } from "@/models/evaluation";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";

export const useCreateEvaluation = (sopID: string) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createEvaluation = async (evaluationID: string) => {
    try {
      setSuccess(false);
      setError(null);
      setLoading(true);

      const evaluation: Evaluation = {
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(
        doc(db, `sop/${sopID}/evaluations/${evaluationID}`),
        evaluation
      );
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
