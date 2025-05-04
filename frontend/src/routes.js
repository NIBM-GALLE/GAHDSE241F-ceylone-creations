// src/routes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUsPage from "./pages/AboutUsPage";
import SuccessStoriesBlogsPage from "./pages/SuccessStoriesBlogsPage";
import WorkshopsPage from "./pages/WorkshopsPage";
import ContactUsPage from "./pages/ContactUsPage";
import FAQsPage from "./pages/FAQsPage";
import ReviewsPage from "./pages/ReviewsPage";
import BlogsStoriesPage from "./pages/BlogsStoriesPage";
import WorkshopManagementPage from "./pages/WorkshopManagementPage";
import MessagingCenterPage from "./pages/MessagingCenterPage";
import MapPage from "./pages/MapPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/success-stories-blogs" element={<SuccessStoriesBlogsPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/faqs" element={<FAQsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/blogs-stories" element={<BlogsStoriesPage />} />
        <Route path="/manage-workshops" element={<WorkshopManagementPage />} />
        <Route path="/messaging" element={<MessagingCenterPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
