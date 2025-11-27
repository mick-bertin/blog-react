import { Outlet } from "react-router-dom";
import Header from "./Header";

function Layout1() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
}

export default Layout1;
