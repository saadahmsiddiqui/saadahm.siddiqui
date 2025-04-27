import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <div className="bg-zinc-900 text-stone-300">
      <Header></Header>
      <div className="flex mt-3">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
