import { Position } from "./type";

export const prefix = "an";
export const POSITIONS = {
  "top-left": "top-left",
  "top-right": "top-right",
  "bottom-left": "bottom-left",
  "bottom-right": "bottom-right",
  "top-center": "top-center",
  "bottom-center": "bottom-center",
};

export const EXIT_AMIMATION: Record<Position, string> = {
  "top-left": "exit-left",
  "top-right": "exit-right",
  "bottom-left": "exit-left",
  "bottom-right": "exit-right",
  "top-center": "exit-top-center",
  "bottom-center": "exit-bottom-center",
};