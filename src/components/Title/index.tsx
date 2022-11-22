import { FC } from "react";

import styles from "./styles.module.scss";

interface ITitleProps {
  title: string;
}

const Title: FC<ITitleProps> = ({ title }) => {
  return <h1 className={styles.title}>{title}</h1>;
};

export default Title;
