export const MAX_LENGTH_ARRAY: number = 16;
export const ROW_LENGTH: number = 4;
export const MIN_COORD: number = 0;
export const MAX_COORD: number = 3;
export const STEP: number = 1;
export const MIX_COUNT: number = 30;

export enum Direction {
  Up = "Up",
  Down = "Down",
  Right = "Right",
  Left = "Left",
}

export const OPPOSITE_DIRECTION = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Right]: Direction.Left,
  [Direction.Left]: Direction.Right,
};
