import React from "react";
import Products from "./Products";
import ChosenProduct from "./ChosenProduct";

export default function ProductsPage() {
  return (
    <div className={"products-page"}>
      <Products />
      {/* <ChosenProduct /> */}
    </div>
  );
}
