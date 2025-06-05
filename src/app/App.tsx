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

function App() {
  const location = useLocation();

  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cardtItems, setCartItems] = useState<CartItem[]>(currentCart);

  /* HANDLER */
  const onAdd = (input: CartItem) => {
    const exist: any = cardtItems.find(
      (item: CartItem) => item._id === input._id
    );
    if (exist) {
      const cartUpdate = cardtItems.map((item: CartItem) =>
        item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item
      );
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cardtItems, { ...input }];
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));
    }
  };
  return (
    <>
      {location.pathname === "/" ? (
        <HomeNavbar cartItems={cardtItems} />
      ) : (
        <OtherNavbar cartItems={cardtItems} />
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
