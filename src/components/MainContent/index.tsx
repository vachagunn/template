import React, { useMemo } from "react";
import mayWavesImg from "../../images/may_waves.jpg";
import camryImg from "../../images/camry.jpg";
import raufAndFaikImg from "../../images/rauf_and_faik.jpg";
import whiteBoxImg from "../../images/white_box.jpg";
import img1Img from "../../images/001.jpg";
import faithImg from "../../images/faith.jpg";
import keskeImg from "../../images/keske.jpg";
import СategoriesList from "../СategoriesList";
import SearchPanel from "../SearchPanel";

interface IMainContentProps {
  controller: ISpotifyController;
}

const MainContent: React.FC<IMainContentProps> = ({ controller }) => {
  const categoriesList1 = useMemo<IMusicCardProps[]>(
    () => [
      { artistName: "May Waves", imgSrc: mayWavesImg, title: "Dead Love" },
      { artistName: "UncleFlexxx", imgSrc: camryImg, title: "Camry 3.5" },
      { artistName: "Rauf & Faik", imgSrc: raufAndFaikImg, title: "I love you" },
      { artistName: "Nothing", imgSrc: whiteBoxImg, title: "White box" },
      { artistName: "Nothing", imgSrc: whiteBoxImg, title: "White box" },
      { artistName: "Nothing", imgSrc: whiteBoxImg, title: "White box" },
      { artistName: "Nothing", imgSrc: whiteBoxImg, title: "White box" },
      { artistName: "Nothing", imgSrc: whiteBoxImg, title: "White box" },
    ],
    []
  );

  const categoriesList2 = useMemo<IMusicCardProps[]>(
    () => [
      { artistName: "FREE FLOW FLAVA", imgSrc: img1Img, title: "001" },
      { artistName: "FREE FLOW FLAVA", imgSrc: faithImg, title: "Faith" },
      { artistName: "Initial D", imgSrc: keskeImg,title: "Eurobeat" },
      { artistName: "Nothing", imgSrc: whiteBoxImg, title: "White box" },
      { artistName: "Nothing", imgSrc: whiteBoxImg, title: "White box" },
      { artistName: "Nothing", imgSrc: whiteBoxImg, title: "White box" },
    ],
    []
  );

  return (
    <main className="content">
      <SearchPanel controller={controller} />
      <СategoriesList listItems={categoriesList1} listName="Music for you" />
      <СategoriesList listItems={categoriesList2} listName="Car Music" />
    </main>
  );
};

export default MainContent;
