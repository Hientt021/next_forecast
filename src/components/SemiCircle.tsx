import { Box, Typography, styled } from "@mui/material";
import { useMemo } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";

interface ISemiCircle {
  value: number;
  max: number;
  label?: string;
}

const Circle = styled(Box)(({ percent }: { percent: number }) => ({
  borderRadius: "50% ",
  border: "30px solid transparent",
  borderTopColor: "#1976d2",
  borderLeftColor: "#1976d2",
  borderRightColor: "rgb(167, 202, 237)",
  borderBottomColor: "rgb(167, 202, 237)",
  width: 200,
  height: 200,
  background: "white",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  rotate: `${-135 + percent}deg`,
}));
const SemiCircle = (props: ISemiCircle) => {
  const { value, max, label } = props;
  const percent = useMemo(() => (value / max) * 180, [value, max]);

  return (
    <Box
      sx={{
        width: 200,

        position: "relative",
        ".arrow": {
          path: {
            fill: "#1976d2",
          },
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translate(-50%, -50%)",
          rotate: `${-90 + percent}deg`,
        },
      }}
    >
      <Typography
        children={0}
        className="step-label"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          transform: "translateX(-200%)",
        }}
      />
      <Typography
        children={max / 2}
        className="step-label"
        sx={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translate(-50%, -100%)",
        }}
      />
      <Box
        sx={{
          height: 100,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Circle percent={percent} />
        <Typography
          children={label}
          variant="h6"
          fontWeight={600}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        />
      </Box>
      <NavigationIcon className="arrow" />
      <Typography
        children={max}
        className="step-label"
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          transform: "translateX(150%)",
        }}
      />
    </Box>
  );
};

export default SemiCircle;
