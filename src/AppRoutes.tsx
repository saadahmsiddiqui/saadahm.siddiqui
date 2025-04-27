import { Route, Routes } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";

function AppRoutes() {
  return (
    <Routes>
      <Route path="saadahm.siddiqui" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
