import { FC, useState, MouseEvent } from "react";
import styles from "./task.module.scss";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Status from "../../Common/Status/StatusSpan";
import { useActions } from "../../../hooks/useActions";
import { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} from "../../../app/api/tasks/tasks.api";
import ModalWindow from "../../Common/Modal/ModalWindow";
import UpdatedTaskForm from "../../PreviewPanel/Forms/UpdatedTaskForm";
import { api } from "../../../app/api/api";
import { Task } from "../../../app/api/tasks/types/task";

interface TaskProps {
  task: Task;
}

const TaskWindow: FC<TaskProps> = ({ task }) => {
  const dispatch = useDispatch();
  const { sectionName } = useSelector((state: RootState) => state.main);

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [deleteTask] = useDeleteTaskMutation();
  const { setCurrentTask } = useActions();
  const handleDeleteTask = (e: MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
    dispatch(
      api.util.invalidateTags([{ type: "Tasks", id: sectionName?.toString() }])
    );
    setCurrentTask(null);
  };

  const [completeTask] = useCompleteTaskMutation();
  const handleCompleteTask = (e: MouseEvent) => {
    e.stopPropagation();
    completeTask(task.id);
    dispatch(
      api.util.invalidateTags([{ type: "Tasks", id: sectionName?.toString() }])
    );
    setCurrentTask(null);
  };

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  const handleActionBtnClick = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.part}>
          <p className={styles.title}>Задача</p>
          <h3 className={styles.text}>{task.text}</h3>
          <Status name={task.status} />
        </div>

        <div className={styles.part}>
          <div className={styles.start_date}>
            <p>Дата создания</p>
            <span>{task.createdDate}</span>
          </div>

          <div className={styles.end_date}>
            <p>Дата окончания</p>
            <span>{task.endedDate}</span>
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
              <li onClick={() => setIsOpen(true)}>
                <img src="/img/edit.svg" height={12} alt="" />
                <a>Редактировать</a>
              </li>
              <li className={styles.delete_action} onClick={handleDeleteTask}>
                <img src="/img/delete-icon.svg" height={12} alt="" />
                <a>Удалить</a>
              </li>
            </ul>
          </span>

          <button
            className={styles.end_button}
            onClick={handleCompleteTask}
          >
            Завершить
          </button>
        </div>
      </div>
      {isOpen && (
        <ModalWindow title="Редактирование задачи" setIsOpen={setIsOpen}>
          <UpdatedTaskForm setIsOpen={setIsOpen} task={task} />
        </ModalWindow>
      )}
    </>
  );
};

export default TaskWindow;
