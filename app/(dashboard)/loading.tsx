import { Box, CircularProgress } from "@mui/material";
import * as React from "react";

export interface IDashboardLoadingProps {}

export default function DashboardLoading(props: IDashboardLoadingProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <CircularProgress color="inherit" size={50} />
    </Box>
  );
}
