import React, { useState } from "react";

import "../css/app.css";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/ordersPage";
import UserPage from "./screens/userPage";
import HomeNavbar from "./components/header/HomeNavbar";
import OtherNavbar from "./components/header/OtherNavbar";
import Footer from "./components/footer";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import "../css/product.css";
import "../css/order.css";
import "../css/userPage.css";
import "../css/help.css";
import HelpPage from "./screens/helpPage";
import { CartItem } from "../lib/types/search";
import useBasket from "./hooks/useBasket";

function App() {
  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();

  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onRemove={onRemove}
          onAdd={onAdd}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onRemove={onRemove}
          onAdd={onAdd}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
        />
      )}
      <Routes>
        <Route path="/help" element={<HelpPage />} />
        <Route path="/product" element={<ProductsPage onAdd={onAdd} />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/member-page" element={<UserPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
