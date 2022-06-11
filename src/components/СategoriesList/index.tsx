import React from "react";
import MusicCard from "../MusicCard";

const СategoriesList: React.FC<IСategoriesListProps> = ({
  listItems,
  listName,
}) => {
  return (
    <>
      <h2 className="category">{listName}</h2>
      <div className="cards">
        {listItems.map((item, i) => (
          <MusicCard key={i} {...item} />
        ))}
      </div>
    </>
  );
};

export default СategoriesList;
