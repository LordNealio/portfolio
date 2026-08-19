import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { PlayerBar } from "./components/PlayerBar";
import { Home } from "./pages/Home";
import { House } from "./pages/House";
import { Work } from "./pages/Work";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Vision } from "./pages/Vision";
import { About } from "./pages/About";
import { Now } from "./pages/Now";
import { Contact } from "./pages/Contact";
import { Store } from "./pages/Store";
import { Constellation } from "./pages/Constellation";
import { PatronExperiment } from "./pages/PatronExperiment";
import { TithingExperiment } from "./pages/TithingExperiment";
import { ExhibitPage } from "./pages/ExhibitPage";
import { WorkWithMe } from "./pages/WorkWithMe";
import { BizWiz } from "./pages/BizWiz";
import { Enter } from "./pages/Enter";
import { Study } from "./pages/Study";
import { StudyReparations } from "./pages/StudyReparations";
import { Cipher } from "./pages/Cipher";
import { RWordModule } from "./pages/RWordModule";
import { StudyAdmin } from "./pages/StudyAdmin";
import { CommentsAdmin } from "./pages/CommentsAdmin";
import { NotFound } from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const GATE_ROUTES = new Set(["/enter", "/enigma", "/christie", "/gnx"]);

export function App() {
  const { pathname } = useLocation();
  const isGate = GATE_ROUTES.has(pathname);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      {!isGate && <Nav />}
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/enter" element={<Enter />} />
          <Route path="/enigma" element={<Enter />} />
          <Route path="/christie" element={<Enter />} />
          <Route path="/gnx" element={<Enter />} />
          <Route path="/house" element={<House />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetail />} />
          <Route path="/store" element={<Store />} />
          <Route path="/constellation" element={<Constellation />} />
          <Route path="/ineed" element={<PatronExperiment />} />
          <Route path="/patron" element={<Navigate to="/ineed" replace />} />
          <Route path="/tithing" element={<TithingExperiment />} />
          <Route path="/exhibit/:id" element={<ExhibitPage />} />
          <Route path="/inspirations" element={<Navigate to="/constellation" replace />} />
          <Route path="/journal" element={<Navigate to="/constellation" replace />} />
          <Route path="/study/n-word" element={<Study />} />
          <Route path="/study/n-word/cipher" element={<Cipher />} />
          <Route path="/study/n-word/admin" element={<StudyAdmin />} />
          <Route path="/study/r-word" element={<StudyReparations />} />
          <Route path="/study/r-word/module" element={<RWordModule />} />
          <Route path="/comments-admin" element={<CommentsAdmin />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/about" element={<About />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
          <Route path="/bizwiz" element={<BizWiz />} />
          <Route path="/now" element={<Now />} />
          <Route path="/connect" element={<Contact />} />
          <Route path="/contact" element={<Navigate to="/connect" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isGate && <Footer />}
      {/* The record rides along on the homepage only. */}
      {pathname === "/" && <PlayerBar />}
      <Analytics />
    </>
  );
}
