import React from "react";
import NavList from "../NavList";

const SidePanel: React.FC = () => {
  return (
    <aside className="side_panel">
      <NavList
        ulClass="main_nav"
        liClass="option"
        liNames={["Home", "My library", "Playlists"]}
      />
      <NavList
        ulClass="additional_nav"
        liClass="other-option"
        liNames={[
          "In trend",
          "Top Gaming Tracks",
          "Top Russian Tracks",
          "World Top 100",
        ]}
      />
    </aside>
  );
};

export default SidePanel;
