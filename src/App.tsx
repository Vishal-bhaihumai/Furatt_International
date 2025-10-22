import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 

const HomePage = React.lazy(() => import("./pages/HomePage"));
const MenuPage = React.lazy(() => import("./pages/MenuPage"));
const GalleryPage = React.lazy(() => import("./pages/GalleryPage"));
const RoomsPage = React.lazy(() => import("./pages/RoomsPage"));
const BanquetPage = React.lazy(() => import("./pages/BanquetPage"));
const ReviewsPage = React.lazy(() => import("./pages/ReviewsPage"));

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/banquet" element={<BanquetPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;