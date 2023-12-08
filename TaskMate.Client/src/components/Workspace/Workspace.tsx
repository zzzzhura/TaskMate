import { useEffect, useState } from "react";
import { decodeToken } from "../../app/utils/decodeToken";
import { getAccessToken } from "../../app/utils/getAccessToken";
import Note from "./Note/Note";
import styles from "./workspace.module.scss";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../hooks/useClickOutside";
import { logout } from "../../app/utils/logout";
import Task from "./Task/Task";

const Workspace = () => {
  const [name, setName] = useState("");

  const { currentNote, currentTask } = useSelector(
    (state: RootState) => state.main
  );

  const [open, setOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  useEffect(() => {
    const token = getAccessToken();
    setName(token ? decodeToken(token).given_name : "");
  }, [name]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <form className={styles.search_panel}>
          <input type="text" placeholder="Найти" />
          <button type="submit">
            <img src="/img/search.svg" alt="search" />
          </button>
        </form>
        <div className={styles.profile} onClick={() => setOpen(true)}>
          <p>{name}</p>
          <img src="/img/account_circle.svg" alt="account" />
          <ul
            ref={domNode}
            className={`${styles.actions} ${open ? styles.open : ""}`}
          >
            <li className={styles.exit_action} onClick={logout}>
              <img src="/img/exit.svg" height={18}></img>
              <a>Выйти</a>
            </li>
          </ul>
        </div>
      </div>
      {currentNote && (
        <Note
          id={currentNote.id}
          title={currentNote.title}
          noteText={currentNote.text}
          tags={currentNote.tags}
        />
      )}
      {currentTask && (
        <Task
          text={currentTask.text}
          status={currentTask.status}
          startedDate={currentTask.createdDate}
          endedDate={currentTask.endedDate}
          id={currentTask.id}
        />
      )}
    </div>
  );
};

export default Workspace;
