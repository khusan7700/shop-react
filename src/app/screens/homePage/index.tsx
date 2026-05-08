import React, { useEffect, useState } from "react";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const product = new ProductService();
    const member = new MemberService();

    Promise.all([
      product
        .getProducts({
          page: 1,
          limit: 4,
          order: "productViews",
          productCollection: ProductCollection.DISH,
        })
        .then((data) => setPopularDishes(data)),

      product
        .getProducts({
          page: 1,
          limit: 4,
          order: "createdAt",
          productCollection: ProductCollection.DISH,
        })
        .then((data) => setNewDishes(data)),

      member.getTopUsers().then((data) => setTopUsers(data)),
    ])
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-page">
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
    </div>
  );
}
