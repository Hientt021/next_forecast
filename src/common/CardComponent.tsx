"use client";
import { Box, BoxProps } from "@mui/material";

type ICardComponent = BoxProps;

export default function CardComponent(props: ICardComponent) {
  const { sx, children } = props;
  return (
    <Box
      {...props}
      sx={{
        ...sx,
        background: "#282c3c",
        borderRadius: 4,
      }}
    >
      {children}
    </Box>
  );
}
