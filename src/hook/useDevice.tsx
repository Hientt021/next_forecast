"use client";
import { useEffect } from "react";
import { setDevice } from "../lib/redux/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "../lib/redux/store";
const BREAK_POINTS = [
  {
    device: "Desktop",
    breakPoint: 1025,
  },
  {
    device: "Ipad",
    breakPoint: 481,
  },
  {
    device: "Mobile",
    breakPoint: 320,
  },
];
const Dimension = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onResize = () => {
      const width = window.innerWidth;
      const current = BREAK_POINTS.find((el) => width >= el.breakPoint);
      dispatch(
        setDevice({
          name: current?.device,
          width: width,
          isMobile: current?.device === "Mobile",
          isIpad: current?.device === "Ipad",
          isDesktop: current?.device === "Desktop",
        })
      );
    };
    if (typeof window !== "undefined") onResize();

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
};

export default Dimension;
