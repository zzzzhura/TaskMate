import { FC, useState } from "react";
import styles from "./task.module.scss";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Status from "../../Common/Status/Status";

interface TaskProps {
  id: number;
  text: string;
  status: string;
  startedDate: string;
  endedDate: string;
}

const Task: FC<TaskProps> = ({text, status, startedDate, endedDate}) => {
  const [open, setOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  const handleActionBtnClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div className={styles.root}>
      <div className={styles.part}>
        <p className={styles.title}>Задача</p>
        <h3 className={styles.text}>
          {text}
        </h3>
        <Status name={status}/>
      </div>

      <div className={styles.part}>
        <div className={styles.start_date}>
          <p>Дата создания</p>
          <span>{startedDate}</span>
        </div>

        <div className={styles.end_date}>
          <p>Дата окончания</p>
          <span>{endedDate}</span>
        </div>
      </div>

      <div className={styles.part}>
        <span
          className={styles.action_btn}
          onClick={(e) => handleActionBtnClick(e)}
        >
          <img src="/img/more.svg" alt="more" />
          <ul
            ref={domNode}
            className={`${styles.actions} ${open ? styles.open : ""}`}
          >
            <li>
              <img src="/img/edit.svg" height={12} alt="" />
              <a>Редактировать</a>
            </li>
            <li className={styles.delete_action}>
              <img src="/img/delete-icon.svg" height={12} alt="" />
              <a>Удалить</a>
            </li>
          </ul>
        </span>

        <button className={styles.end_button}>Завершить</button>
      </div>
    </div>
  );
};

export default Task;
