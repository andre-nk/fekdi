import { db } from "@/firebase/config";
import { Model } from "@/models/model";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetModel = (sopID: string, modelID?: string) => {
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getModel = async (sopID: string, modelID: string) => {
      try {
        setLoading(true);
        const modelSnapshot = await getDoc(
          doc(db, `sop/${sopID}/models/${modelID}`)
        );

        if (modelSnapshot.exists()) {
          const model = modelSnapshot.data() as Model;

          setModel(model);
          setLoading(false);
        } else {
          throw new Error("Model not found");
        }
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (sopID && modelID) {
      getModel(sopID, modelID);
    }
  }, [sopID, modelID]);

  return { model, loading, error };
};
