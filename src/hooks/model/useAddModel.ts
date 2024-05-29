import { db, storage } from "@/firebase/config";
import { Log } from "@/models/log";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useUpdateEvaluation } from "../evaluation/useUpdateEvaluation";
import { Model } from "@/models/model";

export const useAddModel = () => {
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { updateEvaluation } = useUpdateEvaluation();

  const addModel = async (file: File, sopID: string, evaluationID: string) => {
    try {
      setSuccess(null);
      setError(null);
      setLoading(true);

      //Upload file to firebase storage
      const storageRef = ref(storage, `sop/${sopID}/models/${file.name}`);
      const storageResult = await uploadBytes(storageRef, file);
      const storageUrl = await getDownloadURL(storageResult.ref);

      //Add log to SOP
      const model: Model = {
        link: storageUrl,
        isFit: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, `sop/${sopID}/models`), model);
      const modelID = docRef.id;
      await updateEvaluation({
        sopID,
        evaluationID,
        modelID,
      });

      setSuccess(docRef.id);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      setSuccess(null);
    }
  };

  return { addModel, success, loading, error };
};
