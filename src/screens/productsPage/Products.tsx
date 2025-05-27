import React, { useEffect } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";

import { createSelector } from "reselect";
import { Product } from "../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../app/services/ProductService";
import { ProductCollection } from "../../lib/enums/product.enum";
import { serverApi } from "../../lib/config";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createAt",
        productCollection: ProductCollection.DISH,
        search: "",
      })
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

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
              {products.length !== 0 ? (
                products.map((product: Product, index) => {
                  const imagePath = `${serverApi}/${product.productImages}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "litre"
                      : product.productSize + "size";
                  return (
                    <Box className="card">
                      <Stack key={product._id} className="box">
                        <img src={imagePath} alt="" />
                        <div className={"box-txt"}>
                          <p>{product.productName}</p>
                          <p>{product.productPrice} $ </p>
                          <VisibilityIcon
                            sx={{
                              color:
                                product.productViews === 0 ? "gray" : "white",
                            }}
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
