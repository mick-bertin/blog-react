import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout1() {
  return (
    <body>
      <Header />

      <Outlet />
    </body>
  );
}

export default Layout1;
