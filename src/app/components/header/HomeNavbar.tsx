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
                <Button
                  variant="contained"
                  className="login-button"
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            ) : (
              <img
                className="user-avatar"
                src={
                  authMember?.memberImage
                    ? `${serverApi}/${authMember?.memberImage}`
                    : "/blueUserImg.png"
                }
                alt="avatar"
                aria-haspopup={"true"}
                onClick={handleLogoutClick}
              />
            )}
            {/* menu  */}
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
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu2>
            {/* menu  */}
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
          <Menu
            setSignupOpen={setSignupOpen}
            setLoginOpen={setLoginOpen}
            handleLogoutRequest={handleLogoutRequest}
          />
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
                <Button
                  variant={"contained"}
                  className="signup-button"
                  onClick={() => setSignupOpen(true)}
                >
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
    </div>
  );
}
