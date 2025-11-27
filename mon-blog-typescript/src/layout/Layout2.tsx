import { Outlet } from "react-router-dom";
import Header2 from "./Header2";

function Layout2() {
  return (
    <div>
      <Header2 />

      <Outlet />
    </div>
  );
}

export default Layout2;
