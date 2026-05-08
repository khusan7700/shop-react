import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import { useNavigate } from "react-router-dom";

const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function PopularDishes() {
  const { popularDishes } = useSelector(popularDishesRetriever);
  const navigate = useNavigate();

  return (
    <div className="popular-dishes-frame">
      <Container>
        <Stack className="popular-section">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">🔥 Trending</span>
              <h2 className="section-title">Popular Dishes</h2>
            </div>
            <button
              className="section-see-all"
              onClick={() => navigate("/product")}
            >
              See all <ArrowForwardIcon style={{ fontSize: 16 }} />
            </button>
          </div>

          <div className="popular-cards-grid">
            {popularDishes.length !== 0 ? (
              popularDishes.map((ele: Product, i: number) => {
                const imagePath = `${serverApi}/${ele.productImages[0]}`;
                return (
                  <motion.div
                    key={ele._id}
                    className="popular-card"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ amount: 0.3, once: true }}
                    whileHover={{ y: -6 }}
                    onClick={() => navigate("/product")}
                  >
                    {/* Image */}
                    <div className="popular-card-img-wrap">
                      <img
                        src={imagePath}
                        alt={ele.productName}
                        className="popular-card-img"
                      />
                      <div className="popular-card-overlay" />
                      <div className="popular-card-views">
                        <VisibilityIcon style={{ fontSize: 13 }} />
                        <span>{ele.productViews}</span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="popular-card-info">
                      <span className="popular-card-name">
                        {ele.productName}
                      </span>
                      <span className="popular-card-desc">
                        {ele.productDesc
                          ? ele.productDesc.slice(0, 48) + "…"
                          : "Freshly prepared"}
                      </span>
                      <div className="popular-card-footer">
                        <span className="popular-card-price">
                          ${ele.productPrice}
                        </span>
                        <button
                          className="popular-card-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/product");
                          }}
                        >
                          Order →
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="home-no-data">
                <span>🍽️</span>
                <p>No popular dishes yet</p>
              </div>
            )}
          </div>
        </Stack>
      </Container>
    </div>
  );
}
