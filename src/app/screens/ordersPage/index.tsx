import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { motion } from "framer-motion";
import { SyntheticEvent, useState } from "react";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";

export default function OrdersPage() {
  const [value, setValue] = useState("1");

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

        {/* <Stack className={"order-right"}>
          <Stack className="member-box order-info-box">
            <div className="order-user-img">
              <img
                src="/icons/default-user.svg"
                alt="img"
                width={50}
                height={50}
                className="order-user-avatar"
              />
              <div className="order-user-icon-box">
                <img
                  src="/icons/user-badge.svg"
                  alt="img"
                  width={50}
                  height={50}
                  className="order-user-prof-img"
                />
              </div>
            </div>
            <Box className="order-user-name">Justin</Box>
            <Box className="order-user-prof">USER</Box>
            <Box className="liner" />
            <Stack className="order-user-address">
              <LocationOnIcon />
              <Box className="spec-address-text">South Korea, Busan</Box>
            </Stack>
          </Stack>

          <Stack className="card-info order-info-box">
            <Box className="card-input">Card Number: 5243 4090 2002 7495</Box>
            <Stack className="card-half">
              <Box className="card-half-input">07 / 24</Box>
              <Box className="card-half-input">CVV: 010</Box>
            </Stack>
            <Box className="card-input">Justin Robertson</Box>
            <Stack className="cards-box">
              <img
                src="/icons/western-card.svg"
                width={50}
                height={50}
                alt="img"
              ></img>
              <img
                src="/icons/master-card.svg"
                width={50}
                height={50}
                alt="img"
              ></img>
              <img
                src="/icons/paypal-card.svg"
                width={50}
                height={50}
                alt="img"
              ></img>
              <img
                src="/icons/visa-card.svg"
                width={50}
                height={50}
                alt="img"
              ></img>
            </Stack>
          </Stack>
        </Stack> */}
      </Container>
    </div>
  );
}
