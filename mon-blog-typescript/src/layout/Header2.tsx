import { Link, NavLink } from "react-router-dom";
import vite from "../assets/img/renard1.jpeg";
function Header2() {
  // --- Template (JSX) ---
  return (
    <header>
      <nav className="w-full">
        {/* h-24 bg-gradient-to-r from-teal-400 to-blue-500 */}
        <div
          className="flex flex-wrap justify-between items-center h-24  pl-10 pr-10 bg-indigo-600 bg-opacity-0
        ">
          <div id="logo">
            <Link to="/">
              <img src={vite} alt="vite" className=" rounded-4xl w-48 h-22" />
            </Link>
          </div>
          <div>
            <ul className="flex flex-row justify-end gap-5 ">
              <li>
                <NavLink
                  to="/"
                  className="transition ease-in duration-700 rounded-full py-2 px-4 ">
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/articles"
                  className="transition ease-in duration700 rounded-full py-2 px-4 ">
                  Articles
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
export default Header2;
