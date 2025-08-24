import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProjectUniverse from './pages/project-universe';
import TalentSpaceHub from './pages/talent-space-hub';
import AchievementGallery from './pages/achievement-gallery';
import LandingGateway from './pages/landing-gateway';
import AboutMeDimension from './pages/about-me-dimension';
import TechnologyConstellation from './pages/technology-constellation';
import ContactDimension from './pages/contact-dimension';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingGateway />} />
        <Route path="/project-universe" element={<ProjectUniverse />} />
        <Route path="/talent-space-hub" element={<TalentSpaceHub />} />
        <Route path="/achievement-gallery" element={<AchievementGallery />} />
        <Route path="/landing-gateway" element={<LandingGateway />} />
        <Route path="/about-me-dimension" element={<AboutMeDimension />} />
        <Route path="/technology-constellation" element={<TechnologyConstellation />} />
        <Route path="/contact" element={<ContactDimension />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
