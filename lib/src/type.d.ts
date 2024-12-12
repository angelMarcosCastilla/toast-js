import { POSITIONS } from "./constants";

export type Position = keyof typeof POSITIONS;

export type Config = {
  position?: Position;
  maxShow?: number;
  time?: number;
};
export type Props = {
  title: string;
  description?: string;
};

export interface IRenderToast extends Props {
  icon?: string;
  type: "success" | "warning" | "error" | "info" | "default";
}

export interface IToast {
  error(options: Props): void;
  info(options: Props): void;
  warning(options: Props): void;
  default(options: Props): void;
}
