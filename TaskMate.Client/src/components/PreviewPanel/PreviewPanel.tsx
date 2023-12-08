import { useState } from "react";
import { useCreateNoteMutation } from "../../app/api/notes/notes.api";
import ModalWindow from "../Common/Modal/ModalWindow";
import NoteItem from "./NoteItem/NoteItem";
import styles from "./previewPanel.module.scss";
import { CreateNoteRequest } from "../../app/api/notes/types/requests";
import { createNoteSchema } from "../../app/validations/noteSchemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import TaskItem from "./TaskItem/TaskItem";
import Status from "../Common/Status/Status";

const PreviewPanel = () => {
  const { notesList, taskList, sectionName } = useSelector(
    (state: RootState) => state.main
  );

  const [createNote] = useCreateNoteMutation();
  const { setCurrentNote, setCurrentTask } = useActions();

  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteRequest>({
    mode: "onChange",
    resolver: yupResolver(createNoteSchema),
  });

  const onSubmit: SubmitHandler<CreateNoteRequest> = (data) => {
    createNote(data);
    setIsOpen(false);
  };

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
          id={task.id}
          text={task.text}
          status={task.status}
          isActive={activeId === task.id}
        />
      ))}

      {/* {isOpen && (
        <ModalWindow title="Создание заметки" setIsOpen={setIsOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Укажите название заметки</p>
            <input
              {...register("title")}
              type="text"
              placeholder="Название (изначально пустое поле)"
            />
            {errors?.title && (
              <div className={styles.error}>{errors.title.message}</div>
            )}
            <button type="submit">Готово</button>
          </form>
        </ModalWindow>
      )} */}

      {isOpen && (
        <ModalWindow title="Запланировать задачу" setIsOpen={setIsOpen}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Что нужно сделать?</p>
            <input
              {...register("title")}
              type="text"
              placeholder="(изначально пустое поле)"
            />
            {errors?.title && (
              <div className={styles.error}>{errors.title.message}</div>
            )}

            <p>На сколько срочно?</p>
            {/* <select {...register("title")}>
              <option selected value="urgent">
                Срочно
              </option>
              <option value="middle">Может подождать</option>
              <option value="notUrgent">Не срочно</option>
            </select> */}
            <ul>
              <li>
                <input type="radio" name="status" id="cb" value="Urgent" />
                <label htmlFor="cb">
                  <Status name="Срочно" />
                </label>
              </li>
              <li>
                <input type="radio" name="status" id="cb" value="Middle" />
                <label htmlFor="cb">
                  <Status name="Умеренно" />
                </label>
              </li>
              <li>
                <input type="radio" name="status" id="cb" value="NotUrgent" />
                <label htmlFor="cb">
                  <Status name="Не срочно" />
                </label>
              </li>
            </ul>
            {errors?.title && (
              <div className={styles.error}>{errors.title.message}</div>
            )}

            <div>
              <p>Когда необходимо закончить?</p>
              <input
                {...register("title")}
                type="date"
                placeholder="Название (изначально пустое поле)"
                style={{ width: "45%" }}
              />
              {errors?.title && (
                <div className={styles.error}>{errors.title.message}</div>
              )}
            </div>

            <button type="submit">Готово</button>
          </form>
        </ModalWindow>
      )}
    </div>
  );
};

export default PreviewPanel;
