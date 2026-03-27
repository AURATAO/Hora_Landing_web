import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./pages/components/ ScrollToTop";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import FQA from "./pages/FQA";
import JoinPage from "./pages/JoinPage";
import Beta from "./pages/Beta";
import NotFound from "./pages/NotFound";
import GateModal from "./pages/components/GateModal";

function App() {
  return (
    <>
      <BrowserRouter>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-secondary focus:text-white focus:rounded focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <GateModal />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/faq" element={<FQA />} />
          <Route path="/FQA" element={<FQA />} />
          <Route path="/Join" element={<JoinPage />} />
          <Route path="/beta" element={<Beta />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

