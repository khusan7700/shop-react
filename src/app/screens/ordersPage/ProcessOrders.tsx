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

/** Redux  */
const processOrdersRetriever = createSelector(
  retrieverProcessedOrders,
  (processOrders) => ({ processOrders })
);

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue } = props;
  const { processOrders } = useSelector(processOrdersRetriever);
  const { authMember, setOrderBuilder } = useGlobals();

  // todo --> when onclick payment button send to payment API
  // const navigate = useNavigate();
  // const handlePayment = () => {
  //   navigate("/payment");
  // };

  /** HANDLER **/

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.FINISH,
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <TabPanel value="2">
      <Stack>
        {/* number of orders */}
        {processOrders.map((order: Order) => {
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

                <div className="btn">
                  <Button
                    value={order._id}
                    variant="contained"
                    className="pay-button"
                    onClick={finishOrderHandler}
                  >
                    OK
                  </Button>
                </div>
              </Box>
            </Box>
          );
        })}

        {!processOrders ||
          (processOrders.length <= 0 && (
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
