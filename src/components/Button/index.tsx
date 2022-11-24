import cn from "classnames";
import { FC, MouseEvent } from "react";
import { calculateScaleWidth } from "../../utils/mix";

import styles from "./styles.module.scss";

interface IButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseDown: (e: MouseEvent<HTMLButtonElement>) => void;
  mixCount: number;
  isMix: boolean;
}

const Button: FC<IButtonProps> = ({
  onClick,
  onMouseDown,
  mixCount,
  isMix,
}) => {
  const scaleWidth = calculateScaleWidth(mixCount);

  return (
    <button
      className={cn(styles.button, {
        [styles.buttonDisabled]: isMix,
      })}
      onClick={onClick}
      disabled={isMix}
      onMouseDown={onMouseDown}
    >
      <span className={styles.scale} style={{ width: `${scaleWidth}%` }}></span>
      Перемешать
      <span className={styles.count}>{mixCount}</span>
    </button>
  );
};

export default Button;
