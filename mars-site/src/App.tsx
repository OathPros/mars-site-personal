import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SiteHeader, SiteFooter } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { FindMyPathPage } from "./pages/FindMyPathPage";
import { CommitteePage } from "./pages/CommitteePage";
import { ProductionPage } from "./pages/ProductionPage";
import { InventoryPage } from "./pages/InventoryPage";
import { BuildPage } from "./pages/BuildPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { IdeationGuidePage } from "./pages/IdeationGuidePage";
import { ProductionReadinessGuidePage } from "./pages/ProductionReadinessGuidePage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/find-my-path" element={<FindMyPathPage />} />
            <Route path="/committee" element={<CommitteePage />} />
            <Route path="/production" element={<ProductionPage />} />
            <Route path="/production/guide" element={<ProductionReadinessGuidePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/build" element={<BuildPage />} />
            <Route path="/build/ideation-guide" element={<IdeationGuidePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </HashRouter>
  );
}

export default App;
