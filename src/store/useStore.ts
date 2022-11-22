import create from "zustand";
import { persist } from "zustand/middleware";

import { MAX_LENGTH_ARRAY } from "../constants";
import { ICell } from "../types";
import { createCellsData } from "../utils";

interface State {
  cells: ICell[];
  setCells: (cells: ICell[]) => void;
  moveCount: number;
  setMoveCount: (moveCount: number) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      cells: createCellsData(MAX_LENGTH_ARRAY),
      moveCount: 0,
      setMoveCount: (moveCount) => set({ moveCount }),
      setCells: (cells) => set({ cells }),
    }),
    {
      name: "state",
      getStorage: () => sessionStorage,
    }
  )
);
