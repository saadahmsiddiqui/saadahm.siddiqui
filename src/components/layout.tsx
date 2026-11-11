import { Outlet } from "react-router";
import Container from "./container";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      <Container className="pt-10 sm:pt-16">
        <Header />
      </Container>
      <main>
        <Outlet />
      </main>
      <Container className="pb-10 sm:pb-16">
        <Footer />
      </Container>
    </div>
  );
}
