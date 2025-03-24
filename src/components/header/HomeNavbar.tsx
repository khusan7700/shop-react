import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Menu } from "./Menu";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export function HomeNavbar() {
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
            {/* BASKET */}
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
          <Menu />
        </Stack>
        <Stack className="header-frame">
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
