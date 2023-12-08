import { FC, PropsWithChildren } from "react";
import styles from "./modalWindow.module.scss";

interface ModalWindowProps {
  setIsOpen: (isOpen: boolean) => void;
  title: string;
}

const ModalWindow: FC<PropsWithChildren<ModalWindowProps>> = ({
  setIsOpen,
  title,
  children,
}) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)}>
        <div className={styles.centered}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.heading}>{title}</h3>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              <p style={{ marginBottom: "-3px" }}>X</p>
            </button>
            <div className={styles.modalContent}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWindow;
