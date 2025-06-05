import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Pagination, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { createSelector } from "reselect";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 9,
    order: "createAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  // when to click search's X give us all products
  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS **/

  const serachCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const choosenDishHandler = (id: string) => {
    navigate(`/products/${id}`);
  };

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
            <Button
              variant="contained"
              color={
                productSearch.productCollection === ProductCollection.DISH
                  ? "primary"
                  : "secondary"
              }
              onClick={() => serachCollectionHandler(ProductCollection.DISH)}
            >
              Dish
            </Button>
            <Button
              variant="contained"
              color={
                productSearch.productCollection === ProductCollection.SALAD
                  ? "primary"
                  : "secondary"
              }
              onClick={() => serachCollectionHandler(ProductCollection.SALAD)}
            >
              Salad
            </Button>
            <Button
              variant="contained"
              color={
                productSearch.productCollection === ProductCollection.DESSERT
                  ? "primary"
                  : "secondary"
              }
              onClick={() => serachCollectionHandler(ProductCollection.DESSERT)}
            >
              Cake
            </Button>
            <Button
              variant="contained"
              color={
                productSearch.productCollection === ProductCollection.DRINK
                  ? "primary"
                  : "secondary"
              }
              onClick={() => serachCollectionHandler(ProductCollection.DRINK)}
            >
              Set
            </Button>
            <Button
              variant="contained"
              color={
                productSearch.productCollection === ProductCollection.OTHER
                  ? "primary"
                  : "secondary"
              }
              onClick={() => serachCollectionHandler(ProductCollection.OTHER)}
            >
              Other
            </Button>
            <input
              type={"search"}
              className={"custom-input"}
              placeholder="search product....."
              name={"singleResearch"}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchProductHandler();
              }}
            />
            <Button variant="contained" onClick={searchProductHandler}>
              SEARCH
            </Button>
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
              <Button
                variant="contained"
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant="contained"
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>{" "}
            </Stack>
            <Box
              component={motion.div}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
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
                      <Stack
                        key={product._id}
                        className="box"
                        onClick={() => choosenDishHandler(product._id)}
                      >
                        <AddShoppingCartIcon
                          className={"productBasket"}
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                          }}
                        />
                        <img src={imagePath} alt="" />
                        <div className={"box-txt"}>
                          <p>{product.productName}</p>
                          <p>{product.productPrice} $ </p>
                          <VisibilityIcon
                            className="viewIcon"
                            sx={{
                              color:
                                product.productViews === 0 ? "gray" : "white",
                            }}
                          />
                          <span className="viewNumber">
                            {product.productViews}
                          </span>
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
        <Stack spacing={2} className={"pagination"}>
          <Pagination
            className={"paginationNumber"}
            count={
              products.length !== 0
                ? productSearch.page + 1
                : productSearch.page
            }
            color="primary"
            // page={productSearch.page}
            onChange={paginationHandler}
          />
        </Stack>
      </Container>
    </div>
  );
}
