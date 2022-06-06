export default function Footer() {
    return (
        <footer className="footer">
            <p>© 2022 shakhnazaryan vachik</p>
            <audio className="audio" id="audio" src="./audio/andro_-_kak_ne_lyubit__muzati.net.mp3" controls></audio>
            <nav className="footer__navigation">
                <a className="link" href="./images/">Pricing</a>
                <a 
                    className="link" 
                    href="https://vk.com/vachikshakhnazaryan"
                    target="_blank"
                    rel="noopener"
                >Vk</a> 
            </nav>
        </footer>
    );
}