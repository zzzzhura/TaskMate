import { useEffect, useState } from "react";
import {
  useCreateTagMutation,
  useDeleteTagMutation,
  useGetTagsQuery,
} from "../../app/api/tags/tags.api";
import styles from "./navbar.module.scss";
import ModalWindow from "../Common/Modal/ModalWindow";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTagSchema } from "../../app/validations/tagSchemas";
import {
  useLazyGetMyArchivedQuery,
  useLazyGetMyNotesQuery,
  useLazyGetNoTagsQuery,
} from "../../app/api/notes/notes.api";
import { useActions } from "../../hooks/useActions";
import {
  useLazyGetMyCompletedQuery,
  useLazyGetMyTasksQuery,
  useLazyGetUrgentsQuery,
} from "../../app/api/tasks/tasks.api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { setSection } = useActions();

  const navigate = useNavigate();

  const { data: tags } = useGetTagsQuery();

  const [getArchivedTrigger] = useLazyGetMyArchivedQuery();
  const [getMyNotesTrigger] = useLazyGetMyNotesQuery();
  const [getNotesNoTagsTrigger] = useLazyGetNoTagsQuery();

  const [getMyTasksTrigger] = useLazyGetMyTasksQuery();
  const [getCompletedTasksTrigger] = useLazyGetMyCompletedQuery();
  const [geUrgentTasksTrigger] = useLazyGetUrgentsQuery();

  const [createTag] = useCreateTagMutation();
  const [isOpenCreateTagForm, setCreateOpenTagForm] = useState(false);

  const [deleteTag] = useDeleteTagMutation();
  const [isOpenDeleteTagForm, setOpenDeleteTagForm] = useState(false);
  const [deletedTag, setDeletedTag] = useState<Tag | null>(null);

  useEffect(() => {
    getMyNotesTrigger();
    setSection("Личные")
  }, [])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTagRequest>({
    mode: "onChange",
    resolver: yupResolver(createTagSchema),
  });

  const onSubmit: SubmitHandler<CreateTagRequest> = (data) => {
    createTag(data);
    setCreateOpenTagForm(false);
  };

  const handleSectionClick = (sectionName: string) => {
    switch (sectionName) {
      case "Личные":
        getMyNotesTrigger();
        break;
      case "Архив":
        getArchivedTrigger();
        break;
      case "Без тегов":
        getNotesNoTagsTrigger();
        break;
      case "Все":
        getMyTasksTrigger();
        break;
      case "Выполненные":
        getCompletedTasksTrigger();
        break;
      case "Срочные":
        geUrgentTasksTrigger();
        break;
    }
    setSection(sectionName);
  };

  return (
    <div className={styles.root}>
      <ul>
        <div className={styles.logo} onClick={() => navigate("/")}>
          <img src="/img/icon.svg" className={styles.icon} alt="icon" />
          <img src="/img/title.svg" className={styles.word} alt="title" />
        </div>

        <li>
          <details>
            <summary>
              <img src="/img/right-arrow.svg" alt="arrow" />
              <img src="/img/notes-icon.svg" alt="notes" />
              <p>Заметки</p>
            </summary>
            <p
              className={styles.option}
              onClick={() => handleSectionClick("Личные")}
            >
              <img src="/img/account_circle.svg" alt="account" />
              <span>Личные</span>
            </p>
            {/* <p className={`${styles.option} ${styles.disabled}`}>
              <img src="/img/share.svg" alt="share" />
              <span>Общий доступ</span>
            </p> */}
            <p
              className={styles.option}
              onClick={() => handleSectionClick("Без тегов")}
            >
              <img src="/img/none.svg" alt="none" />
              <span>Без тегов</span>
            </p>
          </details>
        </li>

        <li>
          <details>
            <summary>
              <img src="/img/right-arrow.svg" alt="arrow" />
              <img src="/img/task-icon.svg" alt="task" />
              <p>Задачи</p>
            </summary>
            <p
              className={styles.option}
              onClick={() => handleSectionClick("Все")}
            >
              <img src="/img/backpack.svg" alt="tasks" />
              <span>Все</span>
            </p>
            <p
              className={styles.option}
              onClick={() => handleSectionClick("Срочные")}
            >
              <img src="/img/clock.svg" alt="deadline" width={21} />
              <span>Срочные</span>
            </p>
            <p
              className={styles.option}
              onClick={() => handleSectionClick("Выполненные")}
            >
              <img src="/img/complete.svg" alt="complete" width={21} />
              <span>Выполненные</span>
            </p>
          </details>
        </li>

        <li onClick={() => handleSectionClick("Архив")}>
          <details>
            <summary style={{ marginLeft: "22px" }}>
              <img src="/img/archive-icon.svg" alt="archive" />
              <p>Архив</p>
            </summary>
          </details>
        </li>
      </ul>

      <div className={styles.tags}>
        <div className={styles.menu}>
          <h3>Теги</h3>
          <button onClick={() => setCreateOpenTagForm(true)}>+</button>
          <p>?</p>
        </div>
        <div className={styles.list}>
          {tags?.map((tag) => (
            <div key={tag.name} className={styles.tag}>
              <span>{tag.name}</span>
              <img
                src="/img/delete-icon.svg"
                onClick={() => {
                  setOpenDeleteTagForm(true);
                  setDeletedTag(tag);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {isOpenCreateTagForm && (
        <ModalWindow title="Создание тега" setIsOpen={setCreateOpenTagForm}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Укажите название тега</p>
            <input
              {...register("name")}
              type="text"
              placeholder="Название (изначально пустое поле)"
            />
            {errors?.name && (
              <div className={styles.error}>{errors.name.message}</div>
            )}
            <button type="submit">Готово</button>
          </form>
        </ModalWindow>
      )}

      {isOpenDeleteTagForm && (
        <ModalWindow
          title={`Вы действительно хотите удалить тег «${deletedTag?.name}»?`}
          setIsOpen={setOpenDeleteTagForm}
        >
          <p>Это действие невозможно будет отменить</p>
          <div className={styles.actions}>
            <button
              onClick={() => {
                deleteTag(deletedTag?.id!);
                setOpenDeleteTagForm(false);
              }}
            >
              Удалить
            </button>
            <button
              className={styles.cancel_btn}
              onClick={() => setOpenDeleteTagForm(false)}
            >
              Отмена
            </button>
          </div>
        </ModalWindow>
      )}
    </div>
  );
};

export default Navbar;
