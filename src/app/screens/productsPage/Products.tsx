import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Container, Pagination, Stack } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { createSelector } from "reselect";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

const COLLECTIONS = [
  { label: "🍽 Dish", value: ProductCollection.DISH },
  { label: "🥗 Salad", value: ProductCollection.SALAD },
  { label: "🍰 Dessert", value: ProductCollection.DESSERT },
  { label: "🥤 Drink", value: ProductCollection.DRINK },
  { label: "✨ Other", value: ProductCollection.OTHER },
];

const ORDERS = [
  { label: "New", value: "createdAt" },
  { label: "Price", value: "productPrice" },
  { label: "Views", value: "productViews" },
];

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const navigate = useNavigate();

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 9,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  const searchCollectionHandler = (collection: ProductCollection) => {
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

  // ✅ navigate to chosen product
  const chosenProductHandler = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product">
      {/* Hero */}
      <div className="product-top">
        <div className="product-hero-bg" />
        <div className="product-hero-blob pb1" />
        <div className="product-hero-blob pb2" />
        <div className="product-hero-content">
          <span className="product-hero-eyebrow">🍴 Menu</span>
          <h1 className="product-hero-title">Our Products</h1>
          <p className="product-hero-sub">
            Discover our freshly prepared dishes
          </p>
        </div>
      </div>

      <Container>
        <Stack className="product-frame">
          {/* LEFT sidebar */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="product-left"
          >
            <p className="sidebar-section-label">Category</p>
            {COLLECTIONS.map((col) => (
              <button
                key={col.value}
                className={`sidebar-btn ${
                  productSearch.productCollection === col.value ? "active" : ""
                }`}
                onClick={() => searchCollectionHandler(col.value)}
              >
                {col.label}
              </button>
            ))}

            <div className="sidebar-divider" />

            <p className="sidebar-section-label">Search</p>
            <div className="sidebar-search-wrap">
              <SearchIcon className="sidebar-search-icon" />
              <input
                type="search"
                className="sidebar-search-input"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
            </div>
            <button
              className="sidebar-btn active search-btn"
              onClick={searchProductHandler}
            >
              Search
            </button>
          </motion.div>

          {/* RIGHT content */}
          <Stack className="product-right">
            {/* Sort bar */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="sort-bar"
            >
              <span className="sort-label">Sort by:</span>
              {ORDERS.map((ord) => (
                <button
                  key={ord.value}
                  className={`sort-btn ${
                    productSearch.order === ord.value ? "active" : ""
                  }`}
                  onClick={() => searchOrderHandler(ord.value)}
                >
                  {ord.label}
                </button>
              ))}
            </motion.div>

            {/* Cards grid */}
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="card-box"
            >
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <motion.div
                      key={product._id}
                      className="product-card"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => chosenProductHandler(product._id)}
                    >
                      {/* Image */}
                      <div className="product-card-img-wrap">
                        <img
                          src={imagePath}
                          alt={product.productName}
                          className="product-card-img"
                        />
                        {/* Add to cart */}
                        <button
                          className="product-card-cart-btn"
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
                        >
                          <AddShoppingCartIcon style={{ fontSize: 18 }} />
                        </button>
                      </div>

                      {/* Info */}
                      <div className="product-card-info">
                        <span className="product-card-name">
                          {product.productName}
                        </span>
                        <div className="product-card-bottom">
                          <span className="product-card-price">
                            ${product.productPrice}
                          </span>
                          <div className="product-card-views">
                            <VisibilityIcon style={{ fontSize: 13 }} />
                            <span>{product.productViews}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="product-no-data">
                  <span>🍽️</span>
                  <p>No products available</p>
                </div>
              )}
            </Box>
          </Stack>
        </Stack>

        {/* Pagination */}
        <Stack spacing={2} className="pagination">
          <Pagination
            className="paginationNumber"
            count={
              products.length !== 0
                ? productSearch.page + 1
                : productSearch.page
            }
            color="primary"
            onChange={paginationHandler}
            sx={{
              "& .MuiPaginationItem-root": {
                color: "rgba(255,255,255,0.5)",
                borderColor: "rgba(255,255,255,0.1)",
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff",
                border: "none",
              },
            }}
          />
        </Stack>
      </Container>
    </div>
  );
}
