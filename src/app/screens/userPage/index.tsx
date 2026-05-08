// UserPage.tsx
import React from "react";
import { Box, Container, Stack } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Settings } from "./Settings";
import { useGlobals } from "../../hooks/useGlobals";
import { MemberType } from "../../../lib/enums/member.enum";
import { serverApi } from "../../../lib/config";

export default function UserPage() {
  const { authMember } = useGlobals();

  return (
    <div className="user-page-wrapper">
      {/* Hero banner */}
      <div className="user-hero">
        <div className="user-hero-bg" />
        <div className="user-hero-blob b1" />
        <div className="user-hero-blob b2" />
        <Container>
          <div className="user-hero-content">
            <span className="user-hero-eyebrow">👤 Account</span>
            <h1 className="user-hero-title">My Profile</h1>
            <p className="user-hero-sub">Manage your details and preferences</p>
          </div>
        </Container>
      </div>

      {/* Main content */}
      <div className="user-page">
        <Container>
          <Stack className="my-page-frame">
            {/* LEFT — Settings form */}
            <Stack className="my-page-left">
              <div className="section-card">
                <div className="section-card-header">
                  <span className="section-card-icon">✏️</span>
                  <div>
                    <h2 className="section-card-title">Edit Profile</h2>
                    <p className="section-card-desc">
                      Update your personal information
                    </p>
                  </div>
                </div>
                <div className="section-divider" />
                <Box className="menu-content">
                  <Settings />
                </Box>
              </div>
            </Stack>

            {/* RIGHT — Profile card */}
            <Stack className="my-page-right">
              <div className="profile-card">
                {/* Gradient header strip */}
                <div className="profile-card-strip" />

                <div className="profile-card-body">
                  {/* Avatar */}
                  <div className="profile-avatar-wrap">
                    <img
                      src={
                        authMember?.memberImage
                          ? `${serverApi}/${authMember?.memberImage}`
                          : "/img/user2.webp"
                      }
                      alt="avatar"
                      className="profile-avatar"
                    />
                    <div className="profile-badge-wrap">
                      <img
                        src={
                          authMember?.memberType === MemberType.RESTAURANT
                            ? "/icons/restaurant.svg"
                            : "/icons/user-badge.svg"
                        }
                        alt="badge"
                        className="profile-badge"
                      />
                    </div>
                  </div>

                  {/* Name & role */}
                  <h3 className="profile-name">
                    {authMember?.memberNick ?? "Anonymous"}
                  </h3>
                  <span className="profile-role-tag">
                    {authMember?.memberType === MemberType.RESTAURANT
                      ? "🍽️ Restaurant"
                      : "👤 Member"}
                  </span>

                  {/* Info rows */}
                  <div className="profile-info-rows">
                    <div className="profile-info-row">
                      <span className="pir-icon">📍</span>
                      <span className="pir-val">
                        {authMember?.memberAddress ?? "No address"}
                      </span>
                    </div>
                    <div className="profile-info-row">
                      <span className="pir-icon">📱</span>
                      <span className="pir-val">
                        {authMember?.memberPhone ?? "No phone"}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="profile-divider" />

                  {/* Description */}
                  <p className="profile-desc">
                    {authMember?.memberDesc ?? "No description added yet."}
                  </p>

                  {/* Social icons */}
                  <div className="profile-socials">
                    <a className="social-btn fb" href="#" aria-label="Facebook">
                      <FacebookIcon fontSize="small" />
                    </a>
                    <a
                      className="social-btn ig"
                      href="#"
                      aria-label="Instagram"
                    >
                      <InstagramIcon fontSize="small" />
                    </a>
                    <a className="social-btn tg" href="#" aria-label="Telegram">
                      <TelegramIcon fontSize="small" />
                    </a>
                    <a className="social-btn yt" href="#" aria-label="YouTube">
                      <YouTubeIcon fontSize="small" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats mini-cards */}
              <div className="profile-stats">
                <div className="stat-card">
                  <span className="stat-num">0</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">0</span>
                  <span className="stat-label">Reviews</span>
                </div>
                <div className="stat-card">
                  <span className="stat-num">0</span>
                  <span className="stat-label">Points</span>
                </div>
              </div>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
