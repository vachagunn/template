export default function Header() {
    return (
        <div>
        <header className="header">
            <a href="/" className="header__logo link">
                <img src="./images/wolf.png" alt="Логотип" width="64" height="64" />
                <h1 className="header__title">BlissMusic</h1>
            </a>
            <input type="search" className="header__search" placeholder="Поиск трека..." />
            <nav className="header__navigation">
                <a href="/" className="link">Subscription</a>
                <a href="/" className="link">Profile</a>
            </nav>
        </header>
        </div>
    );
}