import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
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
import { useGlobals } from "../../hooks/useGlobals";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const [value, setValue] = useState("1");
  const { orderBuilder, authMember } = useGlobals();
  const [orderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="order-page">
      {/* Hero */}
      <div className="order-hero">
        <div className="order-hero-bg" />
        <div className="order-hero-blob ob1" />
        <div className="order-hero-blob ob2" />
        <Container>
          <div className="order-hero-content">
            <span className="order-hero-eyebrow">🛍️ My Orders</span>
            <h1 className="order-hero-title">Order History</h1>
            <p className="order-hero-sub">Track and manage all your orders</p>
          </div>
        </Container>
      </div>

      {/* Body */}
      <div className="order-body">
        <Container>
          <Stack className="order-left">
            <TabContext value={value}>
              {/* Tab navigation */}
              <div className="order-tabs-wrap">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  className="order-tabs"
                  TabIndicatorProps={{ style: { display: "none" } }}
                >
                  <Tab
                    label={
                      <span className="tab-label-wrap">
                        <span className="tab-dot paused" />
                        Paused
                      </span>
                    }
                    value="1"
                    className="order-tab"
                  />
                  <Tab
                    label={
                      <span className="tab-label-wrap">
                        <span className="tab-dot processing" />
                        Processing
                      </span>
                    }
                    value="2"
                    className="order-tab"
                  />
                  <Tab
                    label={
                      <span className="tab-label-wrap">
                        <span className="tab-dot finished" />
                        Finished
                      </span>
                    }
                    value="3"
                    className="order-tab"
                  />
                </Tabs>
              </div>

              <Stack className="order-main-content">
                <PausedOrders setValue={setValue} />
                <ProcessOrders setValue={setValue} />
                <FinishedOrders />
              </Stack>
            </TabContext>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
