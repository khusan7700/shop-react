import React from "react";

import "../css/app.css";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../screens/homePage";
import ProductsPage from "../screens/productsPage";
import OrdersPage from "../screens/ordersPage";
import UserPage from "../screens/userPage";
import HomeNavbar from "../components/header/HomeNavbar";
import OtherNavbar from "../components/header/OtherNavbar";
import Footer from "../components/footer";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/product.css";
import "../css/order.css";

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
      <Routes>
        <Route path="/product" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
