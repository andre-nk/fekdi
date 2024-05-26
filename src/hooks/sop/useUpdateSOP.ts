import { db } from "@/firebase/config";
import { SOP } from "@/models/sop";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export const useUpdateSOP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const updateSOP = async (id: string, name?: string, tag?: string) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(null);

    try {
      await updateDoc(doc(db, "sop", id), {
        name,
        tag,
        updatedAt: new Date(),
      });
      setIsSuccess(true);
    } catch (error: any) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateSOP, isLoading, isSuccess, isError };
};
