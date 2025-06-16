import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { motion } from "framer-motion";
import { SyntheticEvent, useEffect, useState } from "react";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});
//------------------------------------------------------------------------

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    // get paused orders
    order
      .getMyOrders({
        ...orderInquiry,
        orderStatus: OrderStatus.PAUSE,
      })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));

    // get process orders
    order
      .getMyOrders({
        ...orderInquiry,
        orderStatus: OrderStatus.PROCESS,
      })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));

    // get finished orders
    order
      .getMyOrders({
        ...orderInquiry,
        orderStatus: OrderStatus.FINISH,
      })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      <Stack className="order-txt">
        <div className="txt">
          <span>Order Page</span>
        </div>
      </Stack>

      <Container>
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                >
                  <Tab
                    label="PAUSED ORDERS"
                    value={"1"}
                    sx={{
                      color: "white",
                    }}
                  />
                  <Tab
                    label="PROCESS ORDERS"
                    value={"2"}
                    sx={{ color: "white" }}
                  />
                  <Tab
                    label="FINISHED ORDERS"
                    value={"3"}
                    sx={{ color: "white" }}
                  />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
