import React from "react";
import { Container } from "@mui/material";
import styled, { keyframes } from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const floatUp = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const Footers = styled.div`
  width: 100%;
  background: #07091a;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 160px;
    background: radial-gradient(
      ellipse,
      rgba(114, 125, 241, 0.12) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const TopBar = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding: 28px 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .brand-icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: linear-gradient(135deg, #727df1, #a78bfa);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    animation: ${floatUp} 3s ease-in-out infinite;
  }

  .brand-name {
    font-family: "Georgia", serif;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 0.5px;
  }

  .brand-sub {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.35);
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 2px;
  }
`;

const LiveBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 6px 14px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #4ade80;
    animation: ${pulse} 1.8s ease-in-out infinite;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 32px;
  padding: 32px 0 28px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ColTitle = styled.div`
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.25);
  margin-bottom: 4px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.55);
  font-size: 13px;
  line-height: 1.5;

  svg {
    font-size: 16px;
    color: #727df1;
    flex-shrink: 0;
  }
`;

const TagLine = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.35);
  line-height: 1.7;
  margin: 0;
  max-width: 280px;
`;

const SnsRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const SnsBtn = styled.a`
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.45);
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;

  svg {
    font-size: 17px;
  }

  &:hover {
    background: rgba(114, 125, 241, 0.2);
    border-color: rgba(114, 125, 241, 0.4);
    color: #a5abf8;
    transform: translateY(-2px);
  }
`;

const MenuLink = styled.a`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "";
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(114, 125, 241, 0.6);
    flex-shrink: 0;
  }

  &:hover {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const BottomBar = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  .copy {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.2);
  }

  .made {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.2);

    span {
      color: #727df1;
    }
  }
`;

export default function Footer() {
  return (
    <Footers>
      <Container>
        <TopBar>
          <Brand>
            <div className="brand-icon">🍽️</div>
            <div>
              <div className="brand-name">Halal Kitchen</div>
              <div className="brand-sub">Premium Restaurant</div>
            </div>
          </Brand>
          <LiveBadge>
            <div className="dot" />
            Open now · Closes at 11 PM
          </LiveBadge>
        </TopBar>

        <Grid>
          <Col>
            <ColTitle>About us</ColTitle>
            <TagLine>
              Where every dish tells a story. We bring authentic halal flavors
              to your table — crafted with passion, served with love.
            </TagLine>
            <SnsRow>
              <SnsBtn href="#">
                <FacebookIcon />
              </SnsBtn>
              <SnsBtn href="#">
                <InstagramIcon />
              </SnsBtn>
              <SnsBtn href="#">
                <TwitterIcon />
              </SnsBtn>
              <SnsBtn href="#">
                <AlternateEmailIcon />
              </SnsBtn>
            </SnsRow>
          </Col>

          <Col>
            <ColTitle>Quick links</ColTitle>
            <MenuLink href="/">Home</MenuLink>
            <MenuLink href="/product">Menu</MenuLink>
            <MenuLink href="/orders">My Orders</MenuLink>
            <MenuLink href="/member-page">My Page</MenuLink>
            <MenuLink href="/help">Help & Support</MenuLink>
          </Col>

          <Col>
            <ColTitle>Contact</ColTitle>
            <InfoRow>
              <PhoneIcon />
              010 7730 7215
            </InfoRow>
            <InfoRow>
              <AlternateEmailIcon />
              khusan7700@gmail.com
            </InfoRow>
            <InfoRow>
              <LocationOnIcon />
              Seoul, South Korea
            </InfoRow>
            <InfoRow>
              <AccessTimeIcon />
              Mon–Sun · 10:00 AM – 11:00 PM
            </InfoRow>
          </Col>
        </Grid>

        <BottomBar>
          <span className="copy">
            © 2025 Halal Kitchen · MIT License · All Rights Reserved.
          </span>
          <span className="made">
            Made with <span>♥</span> in Seoul
          </span>
        </BottomBar>
      </Container>
    </Footers>
  );
}
