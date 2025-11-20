// import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import vite from "../../public/vite.svg";
function Header() {
  // --- Template (JSX) ---
  return (
    <header>
      <nav className="w-full">
        {/* h-24 bg-gradient-to-r from-teal-400 to-blue-500 */}
        <div className="flex justify-between items-center h-24 bg-linear-to-r from-lime-200 via-lime-500 to-green-600 pl-10 pr-10">
          <div id="logo">
            <Link to="/">
              <img src={vite} alt="vite" className="logos" />
            </Link>
          </div>
          <div>
            <ul className="flex flex-row justify-end gap-5 ">
              <li>
                <NavLink
                  to="/"
                  className="transition ease-in duration-700 rounded-full py-2 px-4 ">
                  Acceuil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/articles"
                  className="transition ease-in duration700 rounded-full py-2 px-4 ">
                  Articles
                </NavLink>
              </li>{" "}
              <li>
                <NavLink
                  to="/create"
                  className="transition ease-in duration700 rounded-full py-2 px-4 ">
                  Ajouter un Articles
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="transition ease-in duration-700 rounded-full py-2 px-4">
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
     
    </header>
  );
}
export default Header;
