import React from "react";
import { Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { retrieverPausedOrders } from "./selector";
import { useGlobals } from "../../hooks/useGlobals";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import OrderService from "../../services/OrderService";
import { T } from "../../../lib/types/common";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

const pausedOrdersRetriever = createSelector(
  retrieverPausedOrders,
  (pausedOrders) => ({ pausedOrders }),
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.DELETE,
      };
      if (window.confirm("Do you want to delete this order?")) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.PROCESS,
      };
      if (window.confirm("Do you want to proceed with payment?")) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="1" style={{ padding: 0 }}>
      <Stack gap="16px">
        {pausedOrders.map((order: Order) => (
          <Box
            key={order._id}
            component={motion.div}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.2, once: true }}
            className="order-card"
          >
            {/* Status badge */}
            <div className="order-card-status paused">
              <span className="ocs-dot" />
              Paused
            </div>

            {/* Items */}
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

            {/* Footer */}
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
              <div className="ocf-actions">
                <Button
                  value={order._id}
                  className="order-btn cancel"
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  className="order-btn pay"
                  onClick={processOrderHandler}
                >
                  Pay Now →
                </Button>
              </div>
            </div>
          </Box>
        ))}

        {pausedOrders.length === 0 && <EmptyOrders />}
      </Stack>
    </TabPanel>
  );
}

function EmptyOrders() {
  return (
    <div className="order-empty">
      <div className="order-empty-icon">🛒</div>
      <p className="order-empty-title">No orders here</p>
      <p className="order-empty-sub">Your order list is empty</p>
    </div>
  );
}
