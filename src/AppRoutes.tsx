import { Route, Routes } from "react-router";
import Layout from "./components/layout";
import Home from "./components/home";

function AppRoutes() {
  return (
    <>
      <head><title>Hi, You've reached me</title></head>
      <Routes>
        <Route element={<Layout />}>
          <Route path="saadahm.siddiqui" index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
