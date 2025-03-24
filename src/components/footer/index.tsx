import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const Footers = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  background: #0b0f22;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <div className={"fopter-frame"}>
          <div className="foter-txt">
            <Stack className={"year-txt"}>2024 MIT. All Rights Reserved.</Stack>
          </div>
          <div className="foter-tel">
            <span>TEL: 010 7777 7777</span>
            <span>MAIL: khusan7700@gmail.com</span>
            <div className="footer-sns">
              <FacebookIcon className="icons" />
              <InstagramIcon className="icons" />
              <TwitterIcon className="icons" />
              <AlternateEmailIcon className="icons" />
            </div>
          </div>
        </div>
      </Container>
    </Footers>
  );
}
