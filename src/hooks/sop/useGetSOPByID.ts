import { db } from "@/firebase/config";
import { Evaluation } from "@/models/evaluation";
import { Log } from "@/models/log";
import { SOP } from "@/models/sop";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export const useGetSOPByID = (id: string) => {
  const [sop, setSOP] = useState<SOP | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSOP = async () => {
      try {
        setLoading(true);
        const docSnapshot = await getDoc(doc(db, "sop", id));

        if (docSnapshot.exists() === false) {
          throw new Error("No SOP found!");
        }

        const sopData = docSnapshot.data() as SOP;

        //fetch logs
        const logsSnapshot = await getDocs(collection(db, `sop/${id}/logs`));
        const logs = logsSnapshot.docs.map((doc) => doc.data() as Log);
        sopData.logs = logs;

        //fetch evaluations
        const evaluationsSnapshot = await getDocs(
          query(
            collection(db, `sop/${id}/evaluations`),
            orderBy("createdAt", "desc")
          )
        );
        const evaluations = evaluationsSnapshot.docs.map(
          (doc) => doc.data() as Evaluation
        );
        sopData.evaluations = evaluations;

        sopData.id = id;

        setSOP(sopData);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchSOP();
  }, [id]);

  return { sop, loading, error };
};
