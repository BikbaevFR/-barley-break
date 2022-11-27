import { FC } from "react";

import styles from "./styles.module.scss";

import { Direction } from "../../constants/direction";
import { DirectionStrings } from "../../types";
import Key from "../Key";

interface IArrowsProps {
  pressedKey: DirectionStrings | null;
  onClick: (direction: DirectionStrings) => () => void;
}

const Arrows: FC<IArrowsProps> = ({ pressedKey, onClick }) => {
  return (
    <div className={styles.container}>
      <Key
        direction={Direction.Left}
        pressedKey={pressedKey}
        onClick={onClick(Direction.Left)}
      />
      <Key
        direction={Direction.Down}
        pressedKey={pressedKey}
        onClick={onClick(Direction.Down)}
      />
      <Key
        direction={Direction.Right}
        pressedKey={pressedKey}
        onClick={onClick(Direction.Right)}
      />
      <Key
        direction={Direction.Up}
        pressedKey={pressedKey}
        onClick={onClick(Direction.Up)}
      />
    </div>
  );
};

export default Arrows;
