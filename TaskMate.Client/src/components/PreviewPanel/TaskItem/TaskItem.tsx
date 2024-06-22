import { FC, useState, MouseEvent } from "react";
import styles from "./taskItem.module.scss";
import { useDeleteTaskMutation } from "../../../app/api/tasks/tasks.api";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Status from "../../Common/Status/StatusSpan";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { api } from "../../../app/api/api";
import ModalWindow from "../../Common/Modal/ModalWindow";
import UpdatedTaskForm from "../Forms/UpdatedTaskForm";
import { useActions } from "../../../hooks/useActions";
import { Task } from "../../../app/api/tasks/types/task";

interface TaskItemProps {
  task: Task;
  onClick?: () => void;
  isActive?: boolean;
}

const TaskItem: FC<TaskItemProps> = ({ task, onClick, isActive }) => {
  const dispatch = useDispatch();
  const { sectionName } = useSelector((state: RootState) => state.main);

  const [deleteTask] = useDeleteTaskMutation();

  const { setCurrentTask } = useActions();

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  const handleActionBtnClick = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <div
        className={`${styles.root} ${isActive ? styles.active : ""}`}
        onClick={onClick}
      >
        <div className={styles.header}>
          <h4 className={styles.title}>{task.text}</h4>
          <span className={styles.action_btn} onClick={handleActionBtnClick}>
            <img src="/img/more.svg" alt="more" />
          </span>

          <ul
            ref={domNode}
            className={`${styles.actions} ${open ? styles.open : ""}`}
          >
            <li onClick={() => setIsOpen(true)}>
              <img src="/img/edit.svg" height={12} alt="" />
              <a>Редактировать</a>
            </li>
            <li
              className={styles.delete_action}
              onClick={() => {
                deleteTask(task.id);
                dispatch(
                  api.util.invalidateTags([
                    { type: "Tasks", id: sectionName?.toString() },
                  ])
                );
                setCurrentTask(null);
              }}
            >
              <img src="/img/delete-icon.svg" height={12} alt="" />
              <a>Удалить</a>
            </li>
          </ul>
        </div>
        <Status name={task.status} />
      </div>
      {isOpen && (
        <ModalWindow title="Редактирование задачи" setIsOpen={setIsOpen}>
          <UpdatedTaskForm setIsOpen={setIsOpen} task={task} />
        </ModalWindow>
      )}
    </>
  );
};

export default TaskItem;
