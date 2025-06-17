import React from "react";
import { Stack, Box } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrieverFinishedOrders } from "./selector";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

/** Redux  */
const finishedOrdersRetriever = createSelector(
  retrieverFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  const orders = [1, 2];

  // todo --> when onclick payment button send to payment API
  // const navigate = useNavigate();
  // const handlePayment = () => {
  //   navigate("/payment");
  // };

  return (
    <TabPanel value="3">
      <Stack>
        {/* number of orders */}
        {finishedOrders.map((order: Order) => {
          return (
            <Box
              key={order._id}
              className="order-main-box"
              component={motion.div}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ amount: 0.4, once: true }}
            >
              <Box className="order-box-scroll">
                {order?.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <Stack className="order-dish-class">
                        <img
                          src={imagePath}
                          width={50}
                          height={50}
                          style={{ borderRadius: "50%" }}
                          className="order-dish-img"
                          alt="img"
                        />
                        <p className="title-dish">{product.productName}</p>
                      </Stack>
                      <Stack className="price-box">
                        <p>${item.itemPrice}</p>
                        <img
                          src="/icons/close.svg"
                          width={50}
                          height={50}
                          alt="img"
                        />
                        <p>{item.itemQuantity}</p>
                        <img
                          src="/icons/pause.svg"
                          width={50}
                          height={50}
                          alt="img"
                        />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Stack>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img src="/icons/plus.svg" alt="img" />
                  <p> Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src="/icons/pause.svg"
                    alt="img"
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
            >
              <img
                src="/icons/noimage-list.svg"
                alt="img"
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
