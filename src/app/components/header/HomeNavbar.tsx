import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Menu } from "./Menu";
import Basket from "./Basket";
import { motion } from "framer-motion";
import { CartItem } from "../../../lib/types/search";

interface NavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function HomeNavbar(props: NavbarProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const authMember = true;

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="link-container">
          <Box className="brand-logo">
            <NavLink to={"/"}>
              <img src={"/halal.png"} alt="logo" />
            </NavLink>
          </Box>
          <Stack
            className="navbar-links"
            flexDirection={"row"}
            justifyContent={"space-between"}
            minWidth={"700px"}
            alignItems={"center"}
          >
            <Box>
              <NavLink
                to={"/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Home
              </NavLink>
            </Box>
            <Box>
              <NavLink
                to={"/product"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Product
              </NavLink>
            </Box>
            {authMember ? (
              <Box>
                <NavLink
                  to={"/orders"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box>
                <NavLink
                  to={"/member-page"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box>
              <NavLink
                to={"/help"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Help
              </NavLink>
            </Box>
            <Basket
              cartItems={cartItems}
              onRemove={onRemove}
              onAdd={onAdd}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />
            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={"/blueUserImg.png"}
                alt="avatar"
              />
            )}
          </Stack>
          {authMember ? (
            <div id="other-basket">
              <Basket
                cartItems={cartItems}
                onRemove={onRemove}
                onAdd={onAdd}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
            </div>
          ) : null}
          <Menu />
        </Stack>
        <Stack
          component={motion.div}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ amount: 0.4 }}
          className="header-frame"
        >
          <Stack className="detail">
            <Box className="head-main-txt">
              Good food, good friends, good times. Where every meal is a
              celebration. Taste the difference.
            </Box>
            <Box className="wel-txt">The Choice, not just a choice</Box>
            <Box className="service-txt">24 hour service</Box>
            <Box className="signup">
              {!authMember ? (
                <Button variant={"contained"} className="signup-button">
                  SIGN UP
                </Button>
              ) : null}
            </Box>
          </Stack>
          <Box className={"logo-frame"}>
            <div className={"logo-img"}></div>
          </Box>
        </Stack>
      </Container>
      {/* <section>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </section> */}
    </div>
  );
}
