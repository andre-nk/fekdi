import { Result } from "./result";

export type Evaluation = {
  id?: string;
  logID?: string;
  modelID?: string;
  result?: Result[];
  createdAt: Date;
  updatedAt: Date;
};
