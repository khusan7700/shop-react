import React from "react";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Adcertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../css/home.css";

export default function HomePage() {
  return (
    <div className={"home-page"}>
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
