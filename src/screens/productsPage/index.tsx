import React from "react";
import Products from "./Products";
import ChosenProduct from "./ChosenProduct";

// export default function ProductsPage() {
//   const ProductPage = () => {
//     const { id } = useParams();
//   };

//   return (
//     <div className={"products-page"}>
//       <Products />
//       <ChosenProduct />
//     </div>
//   );
// }

import { Routes, Route, useLocation } from "react-router-dom";

export default function ProductsPage() {
  const location = useLocation();
  console.log("Current location:", location.pathname);

  return (
    <div className="products-page">
      <Routes>
        <Route path=":productId" element={<ChosenProduct />} />
        <Route path="" element={<Products />} />
      </Routes>
      <ChosenProduct />
    </div>
  );
}
