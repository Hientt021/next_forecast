"use client";
import { Box, BoxProps, CircularProgress } from "@mui/material";
export interface ILoader extends BoxProps {
  children: any;
  loading: boolean;
}
export default function Loader(props: ILoader) {
  const { children, loading } = props;
  return !loading ? (
    children
  ) : (
    <Box sx={{ ...props?.sx, height: 200, position: "relative" }} {...props}>
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </Box>
  );
}
