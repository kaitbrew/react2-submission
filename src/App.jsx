import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import StoreBanner from "./components/StoreBanner/StoreBanner";
import ShopPage from "./components/ShopPage/ShopPage";
import AdminPortal from "./components/AdminPortal/AdminPortal";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<StoreBanner />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/admin" element={<AdminPortal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;