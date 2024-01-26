"use client";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    laptop: true;
    desktop: true;
  }
}
export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1025,
        desktop: 1200,
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
