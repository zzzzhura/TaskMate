import { useState } from "react";
import ModalWindow from "../Common/Modal/ModalWindow";
import NoteItem from "./NoteItem/NoteItem";
import styles from "./previewPanel.module.scss";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import TaskItem from "./TaskItem/TaskItem";
import CreatedTaskForm from "./Forms/CreatedTaskForm";
import CreatedNoteForm from "./Forms/CreatedNoteForm";

const PreviewPanel = () => {
  const { notesList, taskList, sectionName } = useSelector(
    (state: RootState) => state.main
  );

  const { setCurrentNote, setCurrentTask } = useActions();

  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2>{sectionName}</h2>
        <button onClick={() => setIsOpen(true)}>┿</button>
      </div>

      {notesList?.map((note) => (
        <NoteItem
          onClick={() => {
            setActiveId(note.id);
            setCurrentNote(note);
          }}
          key={note.id}
          id={note.id}
          name={note.title}
          tags={note.tags}
          date={note.createdDate}
          description={note.text}
          isActive={activeId === note.id}
        />
      ))}

      {taskList?.map((task) => (
        <TaskItem
          onClick={() => {
            setActiveId(task.id);
            setCurrentTask(task);
          }}
          key={task.id}
          task={task}
          isActive={activeId === task.id}
        />
      ))}

      {isOpen && notesList && (
        <ModalWindow title="Создание заметки" setIsOpen={setIsOpen}>
          <CreatedNoteForm setIsOpen={setIsOpen} />
        </ModalWindow>
      )}

      {isOpen && taskList && (
        <ModalWindow title="Запланировать задачу" setIsOpen={setIsOpen}>
          <CreatedTaskForm setIsOpen={setIsOpen} />
        </ModalWindow>
      )}
    </div>
  );
};

export default PreviewPanel;
