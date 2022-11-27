import { MAX_COORD, MIN_COORD, ROW_LENGTH, STEP } from "../constants";
import { Direction } from "../constants/direction";
import { DirectionStrings, IPosition } from "../types";

export const getCellPosition = (index: number): IPosition => {
  const x = index % ROW_LENGTH;
  const y = Math.trunc(index / ROW_LENGTH);

  return {
    x,
    y,
  };
};

export const getCellY = (
  direction: DirectionStrings,
  emptyCellY: number
): number => {
  if (direction === Direction.Up) return emptyCellY - STEP;
  if (direction === Direction.Down) return emptyCellY + STEP;

  return emptyCellY;
};

export const getCellX = (
  direction: DirectionStrings,
  emptyCellX: number
): number => {
  if (direction === Direction.Left) return emptyCellX - STEP;
  if (direction === Direction.Right) return emptyCellX + STEP;

  return emptyCellX;
};

export const getCellPositionByDirection = (
  direction: DirectionStrings,
  emptyCellPosition: IPosition
): IPosition => {
  return {
    x: getCellX(direction, emptyCellPosition.x),
    y: getCellY(direction, emptyCellPosition.y),
  };
};

export const isCellInside = (position: IPosition): boolean => {
  if (!(position.x >= MIN_COORD && position.x <= MAX_COORD)) return false;
  if (!(position.y >= MIN_COORD && position.y <= MAX_COORD)) return false;

  return true;
};

export const canCellMove = (
  movingCellPosition?: IPosition,
  emptyCellPosition?: IPosition
): boolean => {
  if (!movingCellPosition || !emptyCellPosition) return false;

  const xDiff = Math.abs(movingCellPosition.x - emptyCellPosition.x);
  const yDiff = Math.abs(movingCellPosition.y - emptyCellPosition.y);

  if (xDiff === 1 && yDiff === 0) return true;
  if (xDiff === 0 && yDiff === 1) return true;

  return false;
};
