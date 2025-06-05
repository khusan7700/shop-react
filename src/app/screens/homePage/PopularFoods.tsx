import { Box, Container, Stack } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const user = [
  { userName: "jon", imagePath: "/img/osh.webp" },
  { userName: "david", imagePath: "/img/lavash.webp" },
  { userName: "cobe", imagePath: "/img/somsa.webp" },
  { userName: "james", imagePath: "/img/kebab.webp" },
];

export default function PopularFoods() {
  return (
    <div className={"popular-foods"}>
      <Container>
        <Stack>
          <Box>
            <Stack>
              {user.length !== 0 ? (
                user.map((ele, index) => {
                  return <motion.div key={index} className="card"></motion.div>;
                })
              ) : (
                <div>no data</div>
              )}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
