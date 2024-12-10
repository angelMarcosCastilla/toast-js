import { POSITIONS } from "./constants";

export type Position = keyof typeof POSITIONS;

export type Config = {
  position?: Position;
};
export type Props = {
  title: string;
  description?: string;
};

export interface IRenderToast extends Props {
  icon: string;
  type: "success" | "warning" | "error" | "info";
}