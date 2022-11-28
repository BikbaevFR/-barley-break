import cn from "classnames";
import { FC } from "react";
import { calculateScaleWidth } from "../../utils/mix";

import styles from "./styles.module.scss";

interface IButtonProps {
  startMixing: () => void;
  startStopWatch: () => void;
  mixCount: number;
  isMix: boolean;
}

const Button: FC<IButtonProps> = ({
  startMixing,
  startStopWatch,
  mixCount,
  isMix,
}) => {
  const scaleWidth = calculateScaleWidth(mixCount);

  return (
    <button
      className={cn(styles.button, {
        [styles.buttonDisabled]: isMix,
      })}
      disabled={isMix}
      onClick={startMixing}
      onMouseDown={startStopWatch}
      onTouchStart={startStopWatch}
      onTouchEnd={startMixing}
    >
      <span className={styles.scale} style={{ width: `${scaleWidth}%` }}></span>
      Перемешать
      <span className={styles.count}>{mixCount}</span>
    </button>
  );
};

export default Button;
