import React from "react";

const NavList: React.FC<INavListProps> = ({ liClass, liNames, ulClass }) => {
  return (
    <ul className={ulClass}>
      {liNames.map((name, index) => (
        <li key={index} className={liClass} tabIndex={0}>
          {name}
        </li>
      ))}
    </ul>
  );
};

export default NavList;