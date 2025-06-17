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

/** Redux  */
const pausedOrdersRetriever = createSelector(
  retrieverPausedOrders,
  (pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  /** HANDLER */
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };

      const confirmation = window.confirm("Do you want to delete this order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        // ORDER REBUILD
        // setValue("2");
        setOrderBuilder(new Date()); // refresh order page
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw Error(Messages.error2);
      // PAYMENT PROCESS

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };

      const confirmation = window.confirm(
        "Do you want to proceed with payment?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        // => PROCESS ORDER
        setValue("2"); // move to process tab
        setOrderBuilder(new Date()); // refresh order page
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  // todo --> when onclick payment button send to payment API
  // const navigate = useNavigate();
  // const handlePayment = () => {
  //   navigate("/payment");
  // };

  return (
    <TabPanel value="1">
      <Stack>
        {/* number of orders */}
        {pausedOrders.map((order: Order) => {
          return (
            <Box
              key={order._id}
              component={motion.div}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ amount: 0.4, once: true }}
              className="order-main-box"
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
                <div className="btn">
                  <Button
                    value={order._id}
                    variant="contained"
                    color="secondary"
                    className={"cancel-button"}
                    onClick={deleteOrderHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    value={order._id}
                    variant="contained"
                    className="pay-button"
                    onClick={processOrderHandler}
                  >
                    Payment
                  </Button>
                </div>
              </Box>
            </Box>
          );
        })}

        {!pausedOrders ||
          (pausedOrders.length === 0 && (
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
