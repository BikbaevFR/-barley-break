import { FC } from "react";

import styles from "./styles.module.scss";

import Key from "../Key";

interface IArrowsProps {}

const Arrows: FC<IArrowsProps> = () => {
  return (
    <div className={styles.container}>
      <Key direction="Left" />
      <Key direction="Down" />
      <Key direction="Right" />
      <Key direction="Up" />
    </div>
  );
};

export default Arrows;
