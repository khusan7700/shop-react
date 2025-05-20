import React, { useEffect } from "react";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Adcertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../css/home.css";

export default function HomePage() {
  //Selector: Store => DATA

  useEffect(() => {
    //Backend server data request => Data
    // Slice: Data --> Store
  }, []);

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
