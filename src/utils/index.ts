import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import { MAX_LENGTH_ARRAY } from "../constants";
import { DirectionStrings, ICell, IPosition } from "../types";
import {
  canCellMove,
  getCellPosition,
  getCellPositionByDirection,
  isCellInside,
} from "./position";

export const createCellsData = (length: number = MAX_LENGTH_ARRAY): ICell[] => {
  const array = new Array(length).fill("");

  const cellPositions = array.map((_, index) => getCellPosition(index));
  // const shuffledPositions = shuffle(cellPositions);

  const data = new Array(length).fill("").map((_, index) => ({
    id: index + 1,
    value: index + 1,
    position: {
      initial: cellPositions[index],
      current: cellPositions[index],
    },
    last: length - 1 === index,
  }));

  return data;
};

export const swapCells = (cells: ICell[], index: number): ICell[] => {
  const movingCellPosition = cells[index].position.current;
  const emptyCellPosition = cells.at(-1)?.position?.current as IPosition;

  if (!canCellMove(movingCellPosition, emptyCellPosition)) return cells;

  const newCells = cloneDeep(cells);
  newCells[index].position.current = emptyCellPosition;
  newCells[cells.length - 1].position.current = movingCellPosition;

  return newCells;
};

export const findMovingCellIndex = (
  cells: ICell[],
  direction: DirectionStrings
): number | null => {
  const emptyCell = cells.at(-1) as ICell;

  const position = getCellPositionByDirection(
    direction,
    emptyCell.position.current
  );

  if (!isCellInside(position)) return null;

  return cells.findIndex((v) => isEqual(v.position.current, position));
};

export const hasEveryCellCorrectPosition = (cells: ICell[]): boolean =>
  cells.every((v) => isEqual(v.position.initial, v.position.current));
