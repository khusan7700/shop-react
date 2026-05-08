import React from "react";
import {
  Box,
  Button,
  Container,
  ListItemIcon,
  MenuItem,
  Stack,
} from "@mui/material";
import Menu2 from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { motion } from "framer-motion";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Menu } from "./Menu";
import { Logout } from "@mui/icons-material";

interface NavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: NavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;
  const { authMember } = useGlobals();

  return (
    <div className="home-navbar">
      <div className="navbar-blob blob-1" />
      <div className="navbar-blob blob-2" />
      <div className="navbar-blob blob-3" />

      <Container className="navbar-container">
        <Stack className="link-container">
          <Box className="brand-logo">
            <NavLink to={"/"}>
              <div className="logo-wrapper">
                <img src={"/halal.png"} alt="logo" />
                <span className="logo-text">
                  Halal<em>Kitchen</em>
                </span>
              </div>
            </NavLink>
          </Box>

          <Stack
            className="navbar-links"
            flexDirection={"row"}
            justifyContent={"space-between"}
            minWidth={"700px"}
            alignItems={"center"}
          >
            {[
              { to: "/", label: "Home" },
              { to: "/product", label: "Menu" },
              ...(authMember ? [{ to: "/orders", label: "Orders" }] : []),
              ...(authMember ? [{ to: "/member-page", label: "My Page" }] : []),
              { to: "/help", label: "Help" },
            ].map(({ to, label }) => (
              <Box key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {label}
                </NavLink>
              </Box>
            ))}

            {authMember && (
              <Basket
                cartItems={cartItems}
                onRemove={onRemove}
                onAdd={onAdd}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
            )}

            {!authMember ? (
              <Box>
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <div className="avatar-wrapper">
                <img
                  className="user-avatar"
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember?.memberImage}`
                      : "/blueUserImg.png"
                  }
                  alt="avatar"
                  aria-haspopup="true"
                  onClick={handleLogoutClick}
                />
                <span className="avatar-ring" />
              </div>
            )}

            <Menu2
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 4px 20px rgba(0,0,0,0.5))",
                  bgcolor: "#1a1a4e",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  mt: 1.5,
                  "& .MuiMenuItem-root": { color: "white" },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "#1a1a4e",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    borderLeft: "1px solid rgba(255,255,255,0.08)",
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ color: "#f87171" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu2>
          </Stack>

          {authMember && (
            <div id="other-basket">
              <Basket
                cartItems={cartItems}
                onRemove={onRemove}
                onAdd={onAdd}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
            </div>
          )}

          <Menu
            setSignupOpen={setSignupOpen}
            setLoginOpen={setLoginOpen}
            handleLogoutRequest={handleLogoutRequest}
          />
        </Stack>

        <Stack
          component={motion.div}
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ amount: 0.3 }}
          className="header-frame"
        >
          <Stack className="detail">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ amount: 0.3 }}
            >
              <div className="hero-badge">🍽️ Open 24 hours</div>
              <Box className="head-main-txt">
                Good food,
                <br />
                good friends,
                <br />
                <em>good times.</em>
              </Box>
            </motion.div>

            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ amount: 0.3 }}
            >
              <Box className="wel-txt">Where every meal is a celebration.</Box>
              <Box className="service-txt">
                Taste the difference — The Choice.
              </Box>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ amount: 0.3 }}
            >
              <Box className="signup">
                {!authMember && (
                  <Button
                    variant="contained"
                    className="signup-button"
                    onClick={() => setSignupOpen(true)}
                  >
                    Get Started
                    <span className="btn-arrow">→</span>
                  </Button>
                )}
              </Box>
            </motion.div>
          </Stack>

          <motion.div
            className="logo-frame"
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            viewport={{ amount: 0.3 }}
          >
            <div className="logo-img" />
            <div className="logo-glow" />
          </motion.div>
        </Stack>
      </Container>
    </div>
  );
}
