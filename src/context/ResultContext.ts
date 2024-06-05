import { create } from "zustand";
import { Result } from "../models/result";

type ResultPayload = {
  results: Result[];
};

type ResultAction = {
  setResults: (results: Result[]) => void;
};

export const useResultContext = create<ResultPayload & ResultAction>((set) => ({
  results: [],
  setResults: (results: Result[]) => set({ results }),
}));
