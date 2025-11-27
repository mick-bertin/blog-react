import { Outlet } from "react-router-dom";
import Header2 from "./Header2";

function Layout2() {
  return (
    <body>
      <Header2 />

      <Outlet />
    </body>
  );
}

export default Layout2;
