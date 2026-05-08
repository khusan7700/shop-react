import React from "react";
import { Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { useGlobals } from "../../hooks/useGlobals";
import { retrieverProcessedOrders } from "./selector";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Messages, serverApi } from "../../../lib/config";
import { Product } from "../../../lib/types/product";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";

interface ProcessOrdersProps {
  setValue: (input: string) => void;
}

const processOrdersRetriever = createSelector(
  retrieverProcessedOrders,
  (processOrders) => ({ processOrders }),
);

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { processOrders } = useSelector(processOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId,
        orderStatus: OrderStatus.FINISH,
      };
      if (window.confirm("Have you received your order?")) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2" style={{ padding: 0 }}>
      <Stack gap="16px">
        {processOrders.map((order: Order) => (
          <Box
            key={order._id}
            className="order-card"
            component={motion.div}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ amount: 0.2, once: true }}
          >
            <div className="order-card-status processing">
              <span className="ocs-dot" />
              Processing
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
              <div className="ocf-actions">
                <Button
                  value={order._id}
                  className="order-btn confirm"
                  onClick={finishOrderHandler}
                >
                  Confirm Received ✓
                </Button>
              </div>
            </div>
          </Box>
        ))}

        {processOrders.length === 0 && (
          <div className="order-empty">
            <div className="order-empty-icon">⏳</div>
            <p className="order-empty-title">No orders in progress</p>
            <p className="order-empty-sub">Paid orders will appear here</p>
          </div>
        )}
      </Stack>
    </TabPanel>
  );
}
