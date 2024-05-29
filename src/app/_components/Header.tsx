import {
  Button,
  PlusIcon,
  SavedIcon,
  ShareIcon,
  TextDropdownButton,
} from "evergreen-ui";
import React from "react";
import VersionDropdown from "./VersionDropdown";
import ModeDropdown from "./ModeDropdown";
import { Evaluation } from "@/models/evaluation";

export default function Header({
  name,
  versions,
  activeEvaluation,
  newEvaluation,
  setActiveEvaluation,
}: {
  name: string;
  versions: Evaluation[];
  activeEvaluation: Evaluation | null;
  newEvaluation: () => void;
  setActiveEvaluation: (name: string) => void;
}) {
  var versionNames = versions
    ? versions.map((version) => version.id!.substring(0, 4))
    : [];

  return (
    <div className="w-full flex p-6 justify-between">
      <h2 className="text-2xl font-medium">{name}</h2>
      <div className="flex justify-end items-center space-x-5">
        {/* <ModeDropdown /> */}
        <VersionDropdown
          versions={versionNames}
          activeEvaluation={activeEvaluation}
          setActiveEvaluation={setActiveEvaluation}
        />
        <Button
          size="medium"
          appearance="primary"
          backgroundColor="#0021A5"
          onClick={newEvaluation}
          iconBefore={<PlusIcon size={12} color="white" />}
        >
          <p className="text-white font-medium">Create new</p>
        </Button>
      </div>
    </div>
  );
}
