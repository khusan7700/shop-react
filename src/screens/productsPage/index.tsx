import React from "react";
import Products from "./Products";
import ChosenProduct from "./ChosenProduct";
import { Routes, Route } from "react-router-dom";

export default function ProductsPage() {
  return (
    <div className="products-page">
      <Routes>
        <Route path=":productId" element={<ChosenProduct />} />
        <Route path="" element={<Products />} />
      </Routes>
    </div>
  );
}
