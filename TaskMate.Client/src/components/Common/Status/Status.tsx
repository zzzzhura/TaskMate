import { FC, useEffect } from "react";
import styles from "./status.module.scss";

interface StatusProps {
  name: string;
}

const Status: FC<StatusProps> = ({ name }) => {
  return (
    <p
      className={`${styles.root} ${
        name === "Срочно"
          ? styles.urgent
          : name === "Умеренно"
          ? styles.middle
          : styles.not_urgent
      }`}
    >
      <span className={styles.circle}>ㅤ</span>
      <span>{name}</span>
    </p>
  );
};

export default Status;
