import { db } from "@/firebase/config";
import { SOP } from "@/models/sop";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";

export const useDeleteSOP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const deleteSOP = async (sopID: string) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(null);

    try {
      await deleteDoc(doc(db, "sop", sopID));
      setIsSuccess(true);
    } catch (error: any) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteSOP, isLoading, isSuccess, isError };
};
