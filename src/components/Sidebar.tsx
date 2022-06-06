export default function Sidebar() {
    return (
        <div>
        <aside className="side_panel">
            <ul className="main_nav">
                <li className="option" tabIndex={0}>Home</li>
                <li className="option" tabIndex={0}>My library</li>
                <li className="option" tabIndex={0}>Playlists</li>
            </ul>
            <ul className="additional_nav">
                <li className="other-option" tabIndex={0}>In trend</li>
                <li className="other-option" tabIndex={0}>Top Gaming Tracks</li>
                <li className="other-option" tabIndex={0}>Top Russian Tracks</li>
                <li className="other-option" tabIndex={0}>World Top 100</li>
                <li className="other-option" tabIndex={0}></li>
            </ul>
        </aside>
        </div>
    );
}