"use client";
import { useEffect } from "react";
import { setDevice } from "../lib/redux/features/app/appSlice";
import { useAppDispatch, useAppSelector } from "../lib/redux/store";
const BREAK_POINTS = [
  {
    device: "Desktop",
    breakPoint: 1200,
  },
  {
    device: "Laptop",
    breakPoint: 1025,
  },
  {
    device: "Tablet",
    breakPoint: 640,
  },
  {
    device: "Mobile",
    breakPoint: 0,
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
          isIpad: current?.device === "Tablet",
          isDesktop: current?.device === "Desktop",
          isLaptop: current?.device === "Laptop",
          isMobileDevice:
            current?.device === "Tablet" || current?.device === "Mobile",
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
