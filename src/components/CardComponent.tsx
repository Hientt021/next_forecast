"use client";
import { Box, BoxProps, Skeleton } from "@mui/material";

type ICardComponent = BoxProps & {
  loading?: boolean;
};

export default function CardComponent(props: ICardComponent) {
  const { sx, children, loading = false } = props;
  return !loading ? (
    <Box
      {...props}
      sx={{
        background: "#fff",
        borderRadius: 6,
        overflow: "auto",
        ...sx,
      }}
    >
      {children}
    </Box>
  ) : (
    <Skeleton
      sx={{ minHeight: 200, background: "#E3F1FF", borderRadius: 6 }}
      variant="rounded"
    />
  );
}
