"use client";
import { UNIT } from "@/app/weather/type";
import { Switch, styled } from "@mui/material";
import { setCurrentUnit } from "../lib/redux/features/unit/unitSlice";
import { useAppDispatch } from "../lib/redux/store";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 6,
  fontWeight: 600,
  "& .MuiSwitch-track": {
    background: "#3B89DB",
    color: "white",
    opacity: 1,
    borderRadius: 11,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",

      transform: "translateY(-45%)",
    },
    "&::before": {
      content: '"C"',
      left: 12,
    },
    "&::after": {
      content: '"F"',
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    background: "white",
  },
}));

interface IDegreeSwitch {}
export default function DegreeSwitch(props: IDegreeSwitch) {
  const dispatch = useAppDispatch();

  return (
    <StyledSwitch
      defaultChecked
      onChange={(e, checked) => {
        dispatch(setCurrentUnit(checked ? UNIT.C : UNIT.F));
      }}
    />
  );
}
