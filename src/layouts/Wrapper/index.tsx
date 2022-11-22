import { FC, ReactNode } from "react";

import styles from "./styles.module.scss";

interface IWrapperProps {
  children: ReactNode;
}

const Wrapper: FC<IWrapperProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Wrapper;
