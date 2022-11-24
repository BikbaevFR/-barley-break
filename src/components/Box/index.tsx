import cn from "classnames";
import { FC } from "react";

import { ICell } from "../../types";
import { canCellMove } from "../../utils/position";
import Cell from "../Cell";
import styles from "./styles.module.scss";

import cupSVG from "../../static/img/cup.svg";
import Arrows from "../Arrows";

interface IBoxProps {
  cells: ICell[];
  onCellClick: (id: number) => () => void;
  isWon: boolean;
  moveCount: number;
  mixSpeed: number;
}

const Box: FC<IBoxProps> = ({
  cells,
  onCellClick,
  isWon,
  moveCount,
  mixSpeed,
}) => {
  const emptyCell = cells.at(-1);

  return (
    <div className={styles.container}>
      <Arrows />

      <div
        className={cn(styles.cup, {
          [styles.cupVisible]: isWon,
        })}
      >
        <div className={styles.cupImg}>
          <img src={cupSVG} alt="cup" />
        </div>
      </div>

      {cells.map((cell, index) => (
        <Cell
          key={cell.id}
          cell={cell}
          onClick={onCellClick(index)}
          canMove={canCellMove(
            cell.position.current,
            emptyCell?.position.current
          )}
          moveCount={moveCount}
          mixSpeed={mixSpeed}
        />
      ))}
    </div>
  );
};

export default Box;
