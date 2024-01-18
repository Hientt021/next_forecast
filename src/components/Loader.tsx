"use client";
import { Box, BoxProps, CircularProgress } from "@mui/material";
interface ILoader extends BoxProps {
  children: any;
  loading: boolean;
}
export default function Loader(props: ILoader) {
  const { children, loading } = props;
  return (
    <Box sx={{ ...props?.sx, minHeight: 200, position: "relative" }} {...props}>
      {!loading ? (
        children
      ) : (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            right: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
    </Box>
  );
}
