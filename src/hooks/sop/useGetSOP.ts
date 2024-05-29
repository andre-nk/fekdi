import { db } from "@/firebase/config";
import { SOP } from "@/models/sop";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetSOP = () => {
  const [sop, setSOP] = useState<SOP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "sop"), async (snapshot) => {
      try {
        setLoading(true);
        if (snapshot.empty) {
          throw new Error("No SOP found!");
        } else {
          const sopList: SOP[] = [];
          snapshot.forEach((doc) => {
            const sopData = doc.data() as SOP;
            sopData.id = doc.id;

            sopList.push(sopData);
          });

          setSOP(sopList);
          setLoading(false);
        }
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return { sop, loading, error };
};
