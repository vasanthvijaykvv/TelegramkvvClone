import { Box, Container, Stack, Typography } from "@mui/material";
import { color } from "@mui/system";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Chat = ({ chat_id, message, updated_at }) => {
  function formatDate(date) {
    const today = window.moment().startOf("day");
    const weekStart = window.moment().startOf("week");
    const monthStart = window.moment().startOf("month");

    const momentDate = window.moment(date);

    if (momentDate.isSame(today, "day")) {
      return momentDate.format("hh:mm A");
    } else if (momentDate.isSameOrAfter(weekStart)) {
      return momentDate.format("dddd");
    } else if (
      momentDate.isSameOrAfter(monthStart) ||
      momentDate.isSameOrAfter(
        window.moment().subtract(1, "month").startOf("month")
      )
    ) {
      return momentDate.format("MMM DD");
    } else {
      return momentDate.format("MMM DD");
    }
  }
  return (
    <>
      <Box
        key={chat_id}
        sx={{
          maxWidth: "20rem",
          width: "auto",
          height: "auto",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          borderRadius: "15px",
          p: 1,
          backgroundColor: "#766ac8",
          color: "white",
        }}
      >
        <Typography>{message}</Typography>
        <Typography  sx={{ textAlign: "end",fontSize:"0.7rem" }}>
          {formatDate(updated_at)}
        </Typography>
      </Box>
    </>
  );
};

export default Chat;
