import { useStore } from "../store/useStore";
import { getSwappedCells } from "../utils";

export const useCells = () => {
  const { cells, setCells } = useStore();

  const swapCells = (index: number): void => {
    setCells(getSwappedCells(cells, index));
  };

  return {
    cells,
    swapCells,
  };
};
