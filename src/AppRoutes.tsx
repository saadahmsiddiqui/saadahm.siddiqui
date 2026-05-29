import { Route, Routes } from "react-router";
import Layout from "./components/layout";
import Home from "./components/home";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="saadahm.siddiqui" index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
