import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="app-header">
      <div>
        <h1>CountryPeek</h1>
      </div>

      <div className="header-actions">
        <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/favourites">Favourites</Link>
        </nav>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        </button>
      </div>
    </header>
  );
}

export default Header;

