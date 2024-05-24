import { Pane, SelectMenu, TimeIcon, Button, SettingsIcon } from "evergreen-ui";
import React from "react";

export default function ModeDropdown() {
  const [selected, setSelected] = React.useState("");

  return (
    <Pane>
      <SelectMenu
        title="Choose mode"
        options={["Conformance", "Discovery", "Enchancement"].map((label) => ({
          label,
          value: label,
          disabled: label === "Discovery" || label === "Enchancement",
        }))}
        selected={selected}
        filterPlaceholder="Choose a mode"
        filterIcon={SettingsIcon}
        onSelect={(item) => setSelected(item.value as string)}
      >
        <Button>{selected ? `Mode: ${selected}` : "Select mode..."}</Button>
      </SelectMenu>
    </Pane>
  );
}
