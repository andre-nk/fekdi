import { db } from "@/firebase/config";
import { Log } from "@/models/log";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetLog = (sopID: string, logID?: string) => {
  const [log, setLog] = useState<Log | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLog = async (sopID: string, logID: string) => {
      try {
        setLoading(true);
        const logSnapshot = await getDoc(doc(db, `sop/${sopID}/logs/${logID}`));
        const log = logSnapshot.data() as Log;

        setLog(log);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (sopID && logID) getLog(sopID, logID);
  }, [sopID, logID]);

  return { log, loading, error };
};
