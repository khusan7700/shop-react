import React from "react";
import Products from "./Products";
import ChosenProduct from "./ChosenProduct";
import { Routes, Route } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function ProductsPage(props: ProductsPageProps) {
  const { onAdd } = props;
  return (
    <div className="products-page">
      <Routes>
        <Route path="" element={<Products onAdd={onAdd} />} />
        <Route path="/product/:id" element={<ChosenProduct onAdd={onAdd} />} />
      </Routes>
    </div>
  );
}
