import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Menu } from "./Menu";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";

interface OtherNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
}

export default function OtherNavbar(props: OtherNavbarProps) {
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
  const authMember = true;

  return (
    <div className="other-navbar">
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
