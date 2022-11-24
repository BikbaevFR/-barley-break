import cn from "classnames";
import isEqual from "lodash/isEqual";
import { FC } from "react";

import { ICell } from "../../types";

import styles from "./styles.module.scss";

interface ICellProps {
  cell: ICell;
  canMove: boolean;
  onClick: () => void;
  moveCount: number;
  mixSpeed: number;
}

const Cell: FC<ICellProps> = ({
  cell,
  onClick,
  canMove,
  moveCount,
  mixSpeed,
}) => {
  const initialPosition = cell.position.initial;
  const currentPosition = cell.position.current;

  const isCorrectPosition = isEqual(initialPosition, currentPosition);

  const x = currentPosition.x * 100;
  const y = currentPosition.y * 100;

  const value = cell.last ? moveCount : cell.value;

  const handleCellClick = () => {
    if (!canMove) return;

    onClick();
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.containerLast]: cell.last,
        [styles.containerCanMove]: canMove,
        [styles.containerCorrectPosition]: isCorrectPosition,
      })}
      style={{
        transform: `translate(${x}%, ${y}%)`,
        transition: `transform ${mixSpeed}ms`,
      }}
      onClick={handleCellClick}
    >
      <div className={styles.content}>{value}</div>
    </div>
  );
};

export default Cell;
