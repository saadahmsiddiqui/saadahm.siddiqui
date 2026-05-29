import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="groovy-background flex items-center justify-center min-h-screen">
      <Outlet></Outlet>
    </div>
  );
}

export default Layout;
