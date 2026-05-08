import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/free-mode";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/thumbs";
// @ts-ignore
import { FreeMode, Navigation, Thumbs } from "swiper";
import { motion } from "framer-motion";
import { createSelector } from "reselect";
import { Product } from "../../../lib/types/product";
import { Dispatch } from "@reduxjs/toolkit";
import { setChosenProduct, setRestaurant } from "./slice";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct }),
);

const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({ restaurant }),
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const { setRestaurant, setChosenProduct } = actionDispatch(useDispatch());
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurantRetriever);
  const navigate = useNavigate();

  useEffect(() => {
    const product = new ProductService();
    product
      // @ts-ignore
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, [productId]);

  if (!chosenProduct) return null;

  return (
    <div className="chosen-product">
      {/* Back button */}
      <button className="chosen-back-btn" onClick={() => navigate(-1)}>
        <ArrowBackIcon style={{ fontSize: 18 }} />
        Back to menu
      </button>

      <Container className="product-container">
        {/* Slider */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="chosen-product-slider"
        >
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  className="slider-image"
                  alt={chosenProduct.productName}
                  src={`${serverApi}/${ele}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Info panel */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="chosen-product-info"
        >
          <div className="info-box">
            {/* Restaurant */}
            <span className="resto-name">
              🍴 {restaurant?.memberNick ?? "Restaurant"}
            </span>

            {/* Name */}
            <h1 className="product-name">{chosenProduct?.productName}</h1>

            {/* Rating + views */}
            <div className="rating-row">
              <Rating
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
                size="small"
                sx={{
                  "& .MuiRating-iconFilled": { color: "#a78bfa" },
                  "& .MuiRating-iconEmpty": {
                    color: "rgba(167,139,250,0.3)",
                  },
                }}
              />
              <div className="views-badge">
                <RemoveRedEyeIcon style={{ fontSize: 14 }} />
                <span>{chosenProduct?.productViews}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="info-divider" />

            {/* Description */}
            <p className="product-desc">
              {chosenProduct?.productDesc ?? "No description available."}
            </p>

            {/* Divider */}
            <div className="info-divider" />

            {/* Price row */}
            <div className="price-row">
              <span className="price-label">Price</span>
              <span className="price-val">
                ${chosenProduct?.productPrice ?? "—"}
              </span>
            </div>

            {/* Add to basket */}
            <button
              className="chosen-add-btn"
              onClick={() =>
                onAdd({
                  _id: chosenProduct._id,
                  quantity: 1,
                  name: chosenProduct.productName,
                  price: chosenProduct.productPrice,
                  image: chosenProduct.productImages[0],
                })
              }
            >
              <AddShoppingCartIcon style={{ fontSize: 18 }} />
              Add to Cart
            </button>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
