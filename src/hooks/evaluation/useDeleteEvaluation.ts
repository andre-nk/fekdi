import { db } from "@/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";

export const useDeleteEvaluation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const deleteSOP = async (sopID: string, evaluationID: string) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(null);

    try {
      await deleteDoc(doc(db, `sop/${sopID}/evaluations/${evaluationID}`));
      setIsSuccess(true);
    } catch (error: any) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteSOP, isLoading, isSuccess, isError };
};
