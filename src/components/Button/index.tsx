import cn from "classnames";
import { FC, MouseEvent } from "react";

import styles from "./styles.module.scss";

interface IButtonProps {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isDisabled: boolean;
}

const Button: FC<IButtonProps> = ({ onClick, isDisabled }) => {
  return (
    <button
      className={cn(styles.button, {
        [styles.buttonDisabled]: isDisabled,
      })}
      onClick={onClick}
      disabled={isDisabled}
    >
      Перемешать
    </button>
  );
};

export default Button;
