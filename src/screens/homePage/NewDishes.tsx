import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { CssVarsProvider } from "@mui/joy";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { motion } from "framer-motion";

const FreshDishes = [
  { productName: "manti", imagePath: "/img/manti.webp" },
  { productName: "chuchvara", imagePath: "/img/chuchvara.webp" },
  { productName: "norin", imagePath: "/img/norin.webp" },
  { productName: "beshbarmoq", imagePath: "/img/beshbarmaq.webp" },
];

export default function NewDishes() {
  return (
    <div className={"new-products-frame"}>
      <Container>
        <Stack className={"main"}>
          <Box className={"category-title"}>Fresh Menu</Box>
          <Stack className={"cards-frame"}>
            <CssVarsProvider>
              {FreshDishes.length !== 0 ? (
                FreshDishes.map((ele, index) => {
                  return (
                    <Card
                      component={motion.div}
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.7, delay: index * 0.2 }}
                      viewport={{ amount: 0.4 }}
                      key={index}
                      variant="outlined"
                      className={"card"}
                    >
                      <CardOverflow>
                        <div className={"product-sale"}>Normal size</div>
                        <AspectRatio ratio="1">
                          <img src={ele.imagePath} alt="photo" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow variant="soft" className={"product-detail"}>
                        <Stack className={"info"}>
                          <Stack className={"row"}>
                            <Typography className={"title"}>
                              {ele.productName}
                            </Typography>
                            <Typography className={"price"}>$12</Typography>
                            <Typography className={"views"}>
                              20
                              <VisibilityIcon
                                sx={{ FormatSize: 20, marginLeft: "5px" }}
                              />
                            </Typography>
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
