import { Direction } from "../constants";

export interface IPosition {
  x: number;
  y: number;
}

export interface ICellPosition {
  initial: IPosition;
  current: IPosition;
}

export interface ICell {
  id: number;
  value: number;
  position: ICellPosition;
  last: boolean;
}

export type DirectionStrings = keyof typeof Direction;
