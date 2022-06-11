import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import SidePanel from "./components/SidePanel";
import SpotifyController from "./services/SpotifyController";

const App: React.FC = () => {
  const [controller, setController] = useState<ISpotifyController>();

  useEffect(() => {
    const loadToken = async () => {
      setController(await new SpotifyController().getToken());
    };
    loadToken();
  }, []);

  return (
    <>
      <Header />
      <SidePanel />
      {!!controller && <MainContent controller={controller} />}
      <Footer />
    </>
  );
};

export default App;
