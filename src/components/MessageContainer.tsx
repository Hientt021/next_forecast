"use client";
import { Alert, Snackbar } from "@mui/material";
import { useAppSelector } from "../lib/redux/store";
import { useEffect, useState } from "react";
import { SharedProps, useSnackbar } from "notistack";

export type IMessageType = "info" | "error" | "success" | "warning";

export default function useAlert() {
  const { enqueueSnackbar } = useSnackbar();

  const showAlert = (content: string, type?: IMessageType) =>
    enqueueSnackbar(content, { variant: type || "default" });

  return { showAlert };
}
