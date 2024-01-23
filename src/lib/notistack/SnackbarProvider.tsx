"use client";

import { SnackbarProvider } from "notistack";

export default function SnackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SnackbarProvider>{children}</SnackbarProvider>;
}
