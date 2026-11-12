import { Route, Routes } from "react-router";
import Layout from "./components/layout";
import Home from "./components/home";
import About from "./components/about";
import Projects from "./components/projects";
import Photography from "./components/photography";
import Hobbies from "./components/hobbies";
import Music from "./components/music";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />} />
        <Route path="music" element={<Music />} />
        <Route path="photography" element={<Photography />} />
        <Route path="hobbies" element={<Hobbies />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
