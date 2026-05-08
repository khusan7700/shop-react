import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopUsers } from "./selector";
import { serverApi } from "../../../lib/config";
import { Member } from "../../../lib/types/member";

const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">👑 Community</span>
              <h2 className="section-title">Top Members</h2>
            </div>
          </div>

          <div className="users-grid">
            {topUsers.length !== 0 ? (
              topUsers.map((member: Member, i: number) => {
                const imagePath =
                  member.memberImage && member.memberImage.trim() !== ""
                    ? `${serverApi}/${member.memberImage}`
                    : "/default-user-img.jpg";

                return (
                  <motion.div
                    key={member._id}
                    className="user-card"
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ amount: 0.3, once: true }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="user-card-avatar-wrap">
                      <img
                        src={imagePath}
                        alt={member.memberNick}
                        className="user-card-avatar"
                      />
                      <div className="user-card-ring" />
                    </div>
                    <span className="user-card-name">{member.memberNick}</span>
                    <span className="user-card-role">Member</span>
                  </motion.div>
                );
              })
            ) : (
              <div className="home-no-data">
                <span>👥</span>
                <p>No active users yet</p>
              </div>
            )}
          </div>
        </Stack>
      </Container>
    </div>
  );
}
