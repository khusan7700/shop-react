import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";

import { createSelector } from "reselect";
import { Product } from "../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

const list = [
  { cardName: "Lavash", cardPrice: 19, imagePath: "/img/lavash.webp" },
  { cardName: "Palov", cardPrice: 15, imagePath: "/img/osh.webp" },
  { cardName: "Somsa", cardPrice: 12, imagePath: "/img/somsa.webp" },
  { cardName: "Kebab", cardPrice: 15, imagePath: "/img/kebab.webp" },
  { cardName: "Chuchvara", cardPrice: 17, imagePath: "/img/lavash.webp" },
  { cardName: "Norin", cardPrice: 20, imagePath: "/img/osh.webp" },
];

export default function Products() {
  return (
    <div className="product">
      <div className={"product-top"}>
        <div className={"product-txt"}>
          <p>Shop Page</p>
        </div>
      </div>
      <Container>
        <Stack className={"product-frame"}>
          <Stack
            component={motion.div}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ amount: 0.4, once: true }}
            className={"product-left"}
          >
            <Button variant="contained">Dish</Button>
            <Button variant="contained">Salad</Button>
            <Button variant="contained">Cake</Button>
            <Button variant="contained">Set</Button>
            <Button variant="contained">Other</Button>
          </Stack>
          <Stack className={"product-right"}>
            <Stack
              component={motion.div}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ amount: 0.4, once: true }}
              className={"menu"}
            >
              <Button variant="contained">New</Button>
              <Button variant="contained">Price</Button>
              <Button variant="contained">Views</Button>{" "}
            </Stack>
            <Box
              component={motion.div}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ amount: 0.4, once: true }}
              className={"card-box"}
            >
              {list.length !== 0 ? (
                list.map((ele, index) => {
                  return (
                    <Box className="card">
                      <Stack className="box">
                        <img src={ele.imagePath} alt="" />
                        <div className={"box-txt"}>
                          <p>{ele.cardName}</p>
                          <p>{ele.cardPrice} $ </p>
                          <VisibilityIcon
                            style={{ marginTop: "15px", marginRight: "10px" }}
                          />
                        </div>
                      </Stack>
                      <Stack className="under-box"></Stack>
                    </Box>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
