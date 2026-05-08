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

const finishedOrdersRetriever = createSelector(
  retrieverFinishedOrders,
  (finishedOrders) => ({ finishedOrders }),
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);

  return (
    <TabPanel value="3" style={{ padding: 0 }}>
      <Stack gap="16px">
        {finishedOrders.map((order: Order) => (
          <Box
            key={order._id}
            className="order-card"
            component={motion.div}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.2, once: true }}
          >
            <div className="order-card-status finished">
              <span className="ocs-dot" />
              Completed
            </div>

            <div className="order-items-list">
              {order?.orderItems?.map((item: OrderItem) => {
                const product: Product = order.productData.filter(
                  (ele: Product) => item.productId === ele._id,
                )[0];
                const imagePath = `${serverApi}/${product.productImages[0]}`;
                return (
                  <div key={item._id} className="order-item-row">
                    <div className="oir-left">
                      <img
                        src={imagePath}
                        alt={product.productName}
                        className="oir-img"
                      />
                      <span className="oir-name">{product.productName}</span>
                    </div>
                    <div className="oir-right">
                      <span className="oir-unit">${item.itemPrice}</span>
                      <span className="oir-sep">×</span>
                      <span className="oir-qty">{item.itemQuantity}</span>
                      <span className="oir-sep">=</span>
                      <span className="oir-total">
                        ${item.itemQuantity * item.itemPrice}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="order-card-footer">
              <div className="ocf-summary">
                <span className="ocf-label">Items</span>
                <span className="ocf-val">
                  ${order.orderTotal - order.orderDelivery}
                </span>
                <span className="ocf-plus">+</span>
                <span className="ocf-label">Delivery</span>
                <span className="ocf-val">${order.orderDelivery}</span>
                <span className="ocf-plus">=</span>
                <span className="ocf-grand">${order.orderTotal}</span>
              </div>
            </div>
          </Box>
        ))}

        {finishedOrders.length === 0 && (
          <div className="order-empty">
            <div className="order-empty-icon">✅</div>
            <p className="order-empty-title">No completed orders</p>
            <p className="order-empty-sub">Finished orders will appear here</p>
          </div>
        )}
      </Stack>
    </TabPanel>
  );
}
