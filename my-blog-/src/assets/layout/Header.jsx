import "./Header.css";
import vite from "../img/vite.svg";
function Header() {
  // --- Logique ---
  const title = "Bienvenue sur mon blog";
  // --- Template (JSX) ---
  return (
    <header>
      <nav>
        <div id="logo">
          <img src={vite} alt="vite" />
        </div>
        <div>
          <ul>
            <li>
              <a href="#">Accueil</a>
            </li>
            <li>
              <a href="#">Articles</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      <h1>{title}</h1>
    </header>
  );
}
export default Header;
