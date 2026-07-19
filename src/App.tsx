import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Work } from "./pages/Work";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Vision } from "./pages/Vision";
import { About } from "./pages/About";
import { Now } from "./pages/Now";
import { Contact } from "./pages/Contact";
import { Store } from "./pages/Store";
import { Journal } from "./pages/Journal";
import { NotFound } from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Nav />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/store" element={<Store />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/about" element={<About />} />
          <Route path="/now" element={<Now />} />
          <Route path="/connect" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
