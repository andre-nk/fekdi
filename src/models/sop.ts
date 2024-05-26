import { Log } from "./log";
import { Evaluation } from "./evaluation";

export type SOP = {
  id?: string;
  name: string;
  tag: string;
  models?: string[];
  logs?: Log[];
  evaluations?: Evaluation[];
  createdAt: Date;
  updatedAt: Date;
};
