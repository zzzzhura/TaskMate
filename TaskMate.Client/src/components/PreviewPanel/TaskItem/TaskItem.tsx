import { FC, useState } from "react";
import styles from "./taskItem.module.scss";
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../../../app/api/tasks/tasks.api";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Status from "../../Common/Status/Status";

interface TaskItemProps {
  id: number;
  text: string;
  status: string;
  startedDate?: string;
  endedDate?: string;
  onClick?: () => void;
  isActive?: boolean;
}

const TaskItem: FC<TaskItemProps> = ({
  id,
  text,
  status,
  onClick,
  isActive,
}) => {
  const [deleteTask] = useDeleteTaskMutation();
  const [editTask] = useUpdateTaskMutation();

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
    <div
      className={`${styles.root} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <div className={styles.header}>
        <h4 className={styles.title}>{text}</h4>
        <span
          className={styles.action_btn}
          onClick={(e) => handleActionBtnClick(e)}
        >
          <img src="/img/more.svg" alt="more" />
        </span>

        <ul
          ref={domNode}
          className={`${styles.actions} ${open ? styles.open : ""}`}
        >
          <li>
            <img src="/img/edit.svg" height={12} alt="" />
            <a>Редактировать</a>
          </li>
          <li className={styles.delete_action} onClick={() => deleteTask(id)}>
            <img src="/img/delete-icon.svg" height={12} alt="" />
            <a>Удалить</a>
          </li>
        </ul>
      </div>
      <Status name={status}/>
    </div>
  );
};

export default TaskItem;
