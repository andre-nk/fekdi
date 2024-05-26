import { db } from "@/firebase/config";
import { SOP } from "@/models/sop";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export const useCreateSOP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);

  const createSOP = async (name: string, tag: string) => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(null);

    try {
      const sop: SOP = {
        name,
        tag,
        models: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await addDoc(collection(db, "sop"), sop);
      setIsSuccess(true);
    } catch (error: any) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { createSOP, isLoading, isSuccess, isError };
};
