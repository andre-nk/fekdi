import { Evaluation } from "@/models/evaluation";
import { Pane, SelectMenu, Button, TimeIcon } from "evergreen-ui";
import React from "react";

export default function VersionDropdown({
  versions,
  activeEvaluation,
  setActiveEvaluation,
}: {
  versions: string[];
  activeEvaluation: Evaluation | null;
  setActiveEvaluation: (id: string) => void;
}) {
  const [selected, setSelected] = React.useState("");

  return (
    <Pane>
      <SelectMenu
        title={
          activeEvaluation
            ? activeEvaluation.id?.substring(0, 4)
            : "Select version"
        }
        options={versions.map((version) => ({
          label: version,
          value: version,
        }))}
        selected={selected}
        filterPlaceholder="Choose a version"
        filterIcon={TimeIcon}
        onSelect={(item) => {
          setSelected(item.value as string);
          setActiveEvaluation(item.value as string);
        }}
      >
        <Button>
          {selected
            ? `Version: ${selected}`
            : activeEvaluation
            ? `New version: ${activeEvaluation.id?.substring(0, 4)}`
            : "Choose a version"}
        </Button>
      </SelectMenu>
    </Pane>
  );
}
