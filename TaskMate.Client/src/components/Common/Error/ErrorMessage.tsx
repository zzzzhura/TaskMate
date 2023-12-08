import { FC } from "react";
import styles from "./errorMessage.module.scss";

interface ErrorMessageProps {
  text: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ text }) => {
  return (
    <div className={styles.root}>{text ?? "Произошла ошибка на сервере"}</div>
  );
};

export default ErrorMessage;
