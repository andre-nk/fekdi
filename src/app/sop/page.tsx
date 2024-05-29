"use client";
import { useCreateSOP } from "@/hooks/sop/useCreateSOP";
import { Button, Pane, PlusIcon, toaster } from "evergreen-ui";
import { useEffect, useState } from "react";
import CreateSOPDialog from "./_components/CreateSOPDialog";
import { useGetSOP } from "@/hooks/sop/useGetSOP";
import Link from "next/link";

export default function SOPPage() {
  const [isShown, setIsShown] = useState(false);
  const { createSOP, isError, isSuccess } = useCreateSOP();
  const { sop, loading, error } = useGetSOP();

  useEffect(() => {
    if (isError) {
      toaster.danger(`Failed to create SOP: ${isError}`);
    } else if (isSuccess) {
      toaster.success("SOP created successfully");
    }
  }, [isError, isSuccess]);

  return (
    <Pane className="w-full flex flex-col p-7">
      <CreateSOPDialog
        createSOP={createSOP}
        isShown={isShown}
        setIsShown={setIsShown}
      />

      <div className="w-full flex justify-between">
        <h2 className="text-2xl font-medium">SOP</h2>
        <div className="flex justify-end items-center space-x-5">
          <Button
            size="medium"
            appearance="primary"
            backgroundColor="#0021A5"
            onClick={() => {
              setIsShown(true);
            }}
            iconBefore={<PlusIcon size={12} color="white" />}
          >
            <p className="text-white font-medium">Create SOP</p>
          </Button>
        </div>
      </div>
      <div className="w-full pt-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="w-full grid grid-cols-3 gap-4">
            {sop.map((s) => (
              <Link href={`/sop/${s.id}`} key={s.id}>
                <div className="bg-white shadow-md rounded-md p-4">
                  <h3 className="text-lg text-black font-medium">{s.name}</h3>
                  <p className="text-sm text-gray-500">{s.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Pane>
  );
}
