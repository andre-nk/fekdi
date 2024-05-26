import { db, storage } from "@/firebase/config";
import { Log } from "@/models/log";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useUpdateEvaluation } from "../evaluation/useUpdateEvaluation";

export const useAddLog = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { updateEvaluation } = useUpdateEvaluation();

  const addLog = async (file: File, sopID: string) => {
    try {
      setSuccess(false);
      setError(null);
      setLoading(true);

      //Upload file to firebase storage
      const storageRef = ref(storage, `sop/${sopID}/logs/${file.name}`);
      const storageResult = await uploadBytes(storageRef, file);
      const storageUrl = await getDownloadURL(storageResult.ref);

      //Add log to SOP
      const log: Log = {
        link: storageUrl,
        isFit: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, `sop/${sopID}/logs`), log);
      await updateDoc(doc(db, `sop/${sopID}`), {
        updatedAt: new Date(),
      });

      //await updateEvaluation(sopID, docRef.id);

      setSuccess(true);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      setSuccess(false);
    }
  };

  return { addLog, success, loading, error };
};
