import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { useNavigate } from "react-router-dom";

/** REDUX SLICE & SELECTOR **/
const newDishesRetriever = createSelector(retrieveNewDishes, (newDishes) => ({
  newDishes,
}));

export default function NewDishes() {
  const { newDishes } = useSelector(newDishesRetriever);
  const navigate = useNavigate();

  console.log("newDishes------->", newDishes);

  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Fresh Menu</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {newDishes.length !== 0 ? (
                newDishes.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + "l"
                      : product.productSize + "size";
                  return (
                    <Card
                      component={motion.div}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      viewport={{ amount: 0.4, once: true }}
                      variant="outlined"
                      key={product._id}
                      className={"card"}
                    >
                      <CardOverflow>
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <AspectRatio ratio="1">
                          <img
                            src={imagePath}
                            alt="img"
                            onClick={(
                              e: React.MouseEvent<HTMLImageElement>
                            ) => {
                              e.preventDefault(); // ixtiyoriy
                              navigate(`/product`);
                            }}
                          />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className={"product-detail"}>
                        <Stack className={"info"}>
                          <Stack className={"row"}>
                            <Typography className={"title"}>
                              {product.productName}
                            </Typography>
                            <Typography className={"price"}>
                              ${product.productPrice}
                            </Typography>
                            {/* <Typography className={"views"}>
                              {product.productViews}
                              <VisibilityIcon
                                sx={{
                                  FormatSize: 20,
                                  marginLeft: "5px",
                                }}
                              />
                            </Typography> */}
                          </Stack>
                        </Stack>
                      </CardOverflow>
                    </Card>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </CssVarsProvider>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
