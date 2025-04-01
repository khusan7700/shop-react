import React from "react";
import { Stack, Box } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { motion } from "framer-motion";

export default function ProcessOrders() {
  const orders = [1, 2];

  // todo --> when onclick payment button send to payment API
  // const navigate = useNavigate();
  // const handlePayment = () => {
  //   navigate("/payment");
  // };

  return (
    <TabPanel value="2">
      <Stack>
        {/* number of orders */}
        {orders.map((ele, index) => {
          return (
            <Box
              key={index}
              className="order-main-box"
              component={motion.div}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ amount: 0.4 }}
            >
              <Box className="order-box-scroll">
                {/* number of items in each order */}
                {[1, 2, 3].map((ele2, index2) => {
                  return (
                    <Box key={index2} className="orders-name-price">
                      <Stack className="order-dish-class">
                        <img
                          src="img/lavash.webp"
                          width={50}
                          height={50}
                          style={{ borderRadius: "50%" }}
                          className="order-dish-img"
                          alt="img"
                        />
                        <p className="title-dish">Lavash</p>
                      </Stack>
                      <Stack className="price-box">
                        <p>$10</p>
                        <img
                          src="/icons/close.svg"
                          width={50}
                          height={50}
                          alt="img"
                        />
                        <p>2</p>
                        <img
                          src="/icons/pause.svg"
                          width={50}
                          height={50}
                          alt="img"
                        />
                        <p style={{ marginLeft: "15px" }}>$20</p>
                      </Stack>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total-price-box">
                <Box className="box-total">
                  <p>Product price</p>
                  <p>$60</p>
                  <img src="/icons/plus.svg" alt="img" />
                  <p> Delivery cost</p>
                  <p>$5</p>
                  <img
                    src="/icons/pause.svg"
                    alt="img"
                    style={{ marginLeft: "20px" }}
                  />
                  <p>Total</p>
                  <p>$65</p>
                </Box>

                <div className="btn">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={"cancel-button"}
                  >
                    Cancel
                  </Button>

                  <Button variant="contained" className="pay-button">
                    Payment
                  </Button>
                </div>
              </Box>
            </Box>
          );
        })}

        {orders.length <= 0 && (
          <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
            <img
              src="/icons/noimage-list.svg"
              alt="img"
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}
