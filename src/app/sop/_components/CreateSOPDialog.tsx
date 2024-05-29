import { Dialog, TextInputField } from "evergreen-ui";
import React, {
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useState,
} from "react";

export default function CreateSOPDialog({
  isShown,
  setIsShown,
  createSOP,
}: {
  isShown: boolean;
  setIsShown: Dispatch<SetStateAction<boolean>>;
  createSOP: (name: string, tag: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <Dialog
      isShown={isShown}
      title="Create a new SOP"
      onConfirm={() => {
        createSOP(value, "-");
        setIsShown(false);
      }}
      onCancel={() => setIsShown(false)}
      confirmLabel="Create"
    >
      <div className="flex flex-col w-full">
        <TextInputField
          inputHeight={36}
          label="SOP Name"
          required
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
        />
      </div>
    </Dialog>
  );
}
