"use client";

import { Pane, SelectMenu, FilmIcon, Button, TimeIcon } from "evergreen-ui";
import React from "react";

export default function VersionDropdown() {
  const [selected, setSelected] = React.useState("");

  return (
    <Pane>
      <SelectMenu
        title="Choose a version"
        options={[
          "Q1 2024",
          "Q4 2023",
          "Q3 2023",
          "Q2 2023",
          "Q1 2023",
          "Q4 2022",
          "Q3 2022",
          "Q2 2022",
          "Q1 2022",
        ].map((label) => ({ label, value: label }))}
        selected={selected}
        filterPlaceholder="Choose a version"
        filterIcon={TimeIcon}
        onSelect={(item) => setSelected(item.value as string)}
      >
        <Button>
          {selected ? `Version: ${selected}` : "Select version..."}
        </Button>
      </SelectMenu>
    </Pane>
  );
}
