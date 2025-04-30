import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <div className="bg-dark-shade1 text-white font-serif">
      <div className="flex justify-center">
        <div className="w-3/5">
          <Header></Header>
          <div className="flex">
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      </div>
    </div>
  );
}

export default Layout;
