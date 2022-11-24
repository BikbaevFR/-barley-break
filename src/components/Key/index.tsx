import cn from "classnames";
import { FC } from "react";

import styles from "./styles.module.scss";

import arrowSVG from "../../static/img/arrow.svg";

interface IKeyProps {
  direction: string;
}

const Key: FC<IKeyProps> = ({ direction }) => {
  return (
    <button className={cn(styles.key, styles["key" + direction])}>
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={styles.front}>
        <img className={styles.img} src={arrowSVG} alt={"arrow"} />
      </span>
    </button>
  );
};

export default Key;
