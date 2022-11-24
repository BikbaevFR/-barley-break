import { DirectionStrings } from "../types";

export enum Direction {
  Up = "Up",
  Down = "Down",
  Right = "Right",
  Left = "Left",
}

export const OPPOSITE_DIRECTION: {
  [key in DirectionStrings]: DirectionStrings;
} = {
  [Direction.Up]: Direction.Down,
  [Direction.Down]: Direction.Up,
  [Direction.Right]: Direction.Left,
  [Direction.Left]: Direction.Right,
};
