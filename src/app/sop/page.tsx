"use client";
import { useCreateSOP } from "@/hooks/sop/useCreateSOP";
import { Button, Dialog, Pane, PlusIcon, toaster } from "evergreen-ui";
import { useEffect, useState } from "react";

export default function SOPPage() {
  const [isShown, setIsShown] = useState(false);
  const { createSOP, isLoading, isError, isSuccess } = useCreateSOP();

  useEffect(() => {
    if (isError) {
      toaster.danger(`Failed to create SOP: ${isError}`);
    } else if (isSuccess) {
      toaster.success("SOP created successfully");
    }
  }, [isError, isSuccess]);

  return (
    <Pane className="w-full flex flex-col p-7">
      <Dialog
        isShown={isShown}
        title="Dialog title"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Custom Label"
      >
        Dialog content
      </Dialog>

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
    </Pane>
  );
}
