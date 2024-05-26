import { db } from "@/firebase/config";
import { SOP } from "@/models/sop";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useGetSOP = () => {
  const [sop, setSOP] = useState<SOP[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSOP = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "sop"));

        if (querySnapshot.empty) {
          throw new Error("No SOP found!");
        } else {
          const sopList: SOP[] = [];
          querySnapshot.forEach((doc) => {
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
    };

    fetchSOP();
  }, []);

  return { sop, loading, error };
};
