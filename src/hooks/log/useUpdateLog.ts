import { db, storage } from "@/firebase/config";
import { Log } from "@/models/log";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

export const useUpdateLog = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateLog = async (file: File, sopID: string, logID: string) => {
    try {
      setSuccess(false);
      setError(null);
      setLoading(true);

      //Upload file to firebase storage
      const storageRef = ref(storage, `sop/${sopID}/logs/${file.name}`);
      const storageResult = await uploadBytes(storageRef, file);
      const storageUrl = await getDownloadURL(storageResult.ref);

      await updateDoc(doc(db, `sop/${sopID}/logs/${logID}`), {
        link: storageUrl,
        isFit: true,
        updatedAt: new Date(),
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

  return { addLog: updateLog, success, loading, error };
};
