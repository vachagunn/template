import React from "react";
import audio from "../../audio/andro_-_kak_ne_lyubit__muzati.net.mp3";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© 2022 shakhnazaryan vachik</p>
      <audio className="audio" id="audio" src={audio} controls></audio>
      <nav className="footer__navigation">
        <a className="link" href="./images/">
          Pricing
        </a>
        <a
          className="link"
          href="https://vk.com/vachikshakhnazaryan"
          target="_blank"
          rel="noreferrer"
        >
          Vk
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
