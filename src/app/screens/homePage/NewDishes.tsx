import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);
  const navigate = useNavigate();

  return (
    <div className="new-products-frame">
      <Container>
        <Stack className="main">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">✨ Just arrived</span>
              <h2 className="section-title" style={{ color: "#fff" }}>
                Fresh Menu
              </h2>
            </div>
            <button
              className="section-see-all"
              onClick={() => navigate("/product")}
            >
              See all <ArrowForwardIcon style={{ fontSize: 16 }} />
            </button>
          </div>

          <div className="new-cards-grid">
            {newDishes.length !== 0 ? (
              newDishes.map((product: Product, i: number) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                const sizeVolume =
                  product.productCollection === ProductCollection.DRINK
                    ? product.productVolume + "L"
                    : product.productSize + " size";

                return (
                  <motion.div
                    key={product._id}
                    className="new-card"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ amount: 0.3, once: true }}
                    whileHover={{ y: -4 }}
                    onClick={() => navigate("/product")}
                  >
                    <div className="new-card-img-wrap">
                      <img
                        src={imagePath}
                        alt={product.productName}
                        className="new-card-img"
                      />
                      <span className="new-card-badge">{sizeVolume}</span>
                    </div>
                    <div className="new-card-info">
                      <span className="new-card-name">
                        {product.productName}
                      </span>
                      <span className="new-card-price">
                        ${product.productPrice}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="home-no-data">
                <span>🍜</span>
                <p>No new dishes yet</p>
              </div>
            )}
          </div>
        </Stack>
      </Container>
    </div>
  );
}
