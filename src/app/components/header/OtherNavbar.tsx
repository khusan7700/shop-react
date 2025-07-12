import {
  Box,
  Button,
  Container,
  Stack,
  ListItemIcon,
  MenuItem,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Menu } from "./Menu";
import Basket from "./Basket";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import Menu2 from "@mui/material/Menu";
import { Logout } from "@mui/icons-material";

interface OtherNavbarProps {
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

export default function OtherNavbar(props: OtherNavbarProps) {
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
            {authMember ? (
              <Basket
                cartItems={cartItems}
                onRemove={onRemove}
                onAdd={onAdd}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
            ) : null}

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
      </Container>
    </div>
  );
}
