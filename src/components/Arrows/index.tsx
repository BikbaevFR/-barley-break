import { FC } from "react";

import styles from "./styles.module.scss";

import { Direction } from "../../constants/direction";
import { DirectionStrings } from "../../types";
import Key from "../Key";

interface IArrowsProps {
  activeKey: DirectionStrings | null;
  onClick: (direction: DirectionStrings) => () => void;
}

const Arrows: FC<IArrowsProps> = ({ activeKey, onClick }) => {
  return (
    <div className={styles.container}>
      <Key
        direction={Direction.Left}
        activeKey={activeKey}
        onClick={onClick(Direction.Left)}
      />
      <Key
        direction={Direction.Down}
        activeKey={activeKey}
        onClick={onClick(Direction.Down)}
      />
      <Key
        direction={Direction.Right}
        activeKey={activeKey}
        onClick={onClick(Direction.Right)}
      />
      <Key
        direction={Direction.Up}
        activeKey={activeKey}
        onClick={onClick(Direction.Up)}
      />
    </div>
  );
};

export default Arrows;
