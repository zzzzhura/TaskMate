import { useEffect, useState } from "react";
import { decodeToken } from "../../app/utils/decodeToken";
import { getAccessToken } from "../../app/utils/getAccessToken";
import Note from "./Note/Note";
import styles from "./workspace.module.scss";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../hooks/useClickOutside";
import { logout } from "../../app/utils/logout";
import Task from "./Task/TaskWindow";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { Status } from "../../app/api/tasks/types/task";
import { base64ArrayBuffer } from "../../app/utils/base64ArrayBuffer";

const Workspace = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const [name, setName] = useState("");

  const { sectionName, currentNote, currentTask, fullNotes, fullTasks } =
    useSelector((state: RootState) => state.main);

  const { setNotesList, setTasksList } = useActions();

  const [open, setOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  useEffect(() => {
    const token = getAccessToken();
    setName(token ? decodeToken(token).given_name : "");
  }, [name]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const updateSearchValue = (str: string) => {
    if (fullNotes) {
      let filteredNotes;

      if (sectionName === "Архив") {
        filteredNotes = fullNotes?.filter((note) => {
          return (
            note.title.toLowerCase().includes(str.toLowerCase()) &&
            note.isArchived
          );
        });
      }
      if (sectionName === "Без тегов") {
        filteredNotes = fullNotes?.filter((note) => {
          return (
            note.title.toLowerCase().includes(str.toLowerCase()) &&
            note.tags.length === 0
          );
        });
      } else {
        filteredNotes = fullNotes?.filter((note) => {
          return note.title.toLowerCase().includes(str.toLowerCase());
        });
      }

      setNotesList(filteredNotes);
    } else {
      let filteredTasks;
      if (sectionName === "Выполненные") {
        filteredTasks = fullTasks?.filter((task) => {
          return (
            task.text.toLowerCase().includes(str.toLowerCase()) &&
            task.isCompleted
          );
        });
      }
      if (sectionName === "Срочные") {
        filteredTasks = fullTasks?.filter((task) => {
          return (
            task.text.toLowerCase().includes(str.toLowerCase()) &&
            task.status === Status.Urgent
          );
        });
      } else {
        filteredTasks = fullTasks?.filter((task) => {
          return task.text.toLowerCase().includes(str.toLowerCase());
        });
      }

      setTasksList(filteredTasks);
    }
  };

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <form className={styles.search_panel}>
          <input
            type="text"
            placeholder="Найти"
            onChange={onChangeInput}
            value={value}
          />

          <img src="/img/search.svg" alt="search" />
        </form>
        <div className={styles.profile} onClick={() => setOpen(true)}>
          <p>{name}</p>
          <img src="/img/account_circle.svg" alt="account" />
          <ul
            ref={domNode}
            className={`${styles.actions} ${open ? styles.open : ""}`}
          >
            <li className={styles.exit_action} onClick={handleLogout}>
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
          image={currentNote.image}
        />
      )}
      {currentTask && <Task task={currentTask} />}
    </div>
  );
};

export default Workspace;
