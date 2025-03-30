import React from "react";
import { Box, Button, Container, Menu, MenuItem, Stack } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Pagination from "@mui/material/Pagination";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const list = [
  { cardName: "Lavash", cardPrice: 19, imagePath: "/img/lavash.webp" },
  { cardName: "Palov", cardPrice: 15, imagePath: "/img/osh.webp" },
  { cardName: "Somsa", cardPrice: 12, imagePath: "/img/somsa.webp" },
  { cardName: "Kebab", cardPrice: 15, imagePath: "/img/kebab.webp" },
  { cardName: "Chuchvara", cardPrice: 17, imagePath: "/img/lavash.webp" },
  { cardName: "Norin", cardPrice: 20, imagePath: "/img/osh.webp" },
];

export default function Products() {
  return (
    <div className="product">
      <div className={"product-top"}>
        <div className={"product-txt"}>
          <p>Shop Page</p>
        </div>
      </div>
      <Container>
        <Stack className={"product-frame"}>
          <Stack className={"product-left"}>
            <Button variant="contained">Dish</Button>
            <Button variant="contained">Salad</Button>
            <Button variant="contained">Cake</Button>
            <Button variant="contained">Set</Button>
            <Button variant="contained">Other</Button>
          </Stack>
          <Stack className={"product-right"}>
            <Stack className={"menu"}>
              <Button variant="contained">New</Button>
              <Button variant="contained">Price</Button>
              <Button variant="contained">Views</Button>{" "}
            </Stack>
            <Box className={"card-box"}>
              {list.length !== 0 ? (
                list.map((ele, index) => {
                  return (
                    <Box className="card">
                      <Stack className="box">
                        <img src={ele.imagePath} alt="" />
                        <div className={"box-txt"}>
                          <p>{ele.cardName}</p>
                          <p>{ele.cardPrice} $ </p>
                          <VisibilityIcon
                            style={{ marginTop: "15px", marginRight: "10px" }}
                          />
                        </div>
                      </Stack>
                      <Stack className="under-box"></Stack>
                    </Box>
                  );
                })
              ) : (
                <Box className="no-data">New products are not available!</Box>
              )}
            </Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
