"use client";
import { Alert, Snackbar } from "@mui/material";
import { useAppSelector } from "../lib/redux/store";
import { useEffect, useState } from "react";

export type IMessageType = "info" | "error" | "success" | "warning";

export default function MessageContainer() {
  const [open, setOpen] = useState(false);
  const { messages } = useAppSelector((state) => state.app);

  const onClose = () => setOpen(false);

  useEffect(() => {
    setOpen(true);
  }, [messages]);

  return messages?.map((el) => (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={!el.autoClose ? null : 3000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={el.type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {el.content}
      </Alert>
    </Snackbar>
  ));
}
