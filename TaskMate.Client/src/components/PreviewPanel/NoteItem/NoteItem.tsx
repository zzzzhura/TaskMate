import { FC, MouseEvent, useState } from "react";
import styles from "./noteItem.module.scss";
import { useClickOutside } from "../../../hooks/useClickOutside";
import {
  useDeleteNoteMutation,
  useMoveToArchiveMutation,
} from "../../../app/api/notes/notes.api";
import { api } from "../../../app/api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useActions } from "../../../hooks/useActions";

interface NoteItemProps {
  id: number;
  name: string;
  tags: Tag[];
  description: string;
  date: string;
  onClick?: () => void;
  isActive?: boolean;
}

const NoteItem: FC<NoteItemProps> = ({
  id,
  name,
  tags,
  description,
  date,
  onClick,
  isActive,
}) => {
  const dispatch = useDispatch();
  const { sectionName } = useSelector((state: RootState) => state.main);

  const [deleteNote] = useDeleteNoteMutation();
  const handleDeleteNote = (e: MouseEvent) => {
    e.stopPropagation();
    deleteNote(id);
    dispatch(
      api.util.invalidateTags([{ type: "Notes", id: sectionName?.toString() }])
    );

    setCurrentNote(null);
  };

  const [moveToArchive] = useMoveToArchiveMutation();
  const handleToArchiveNote = (e: MouseEvent) => {
    e.stopPropagation();
    moveToArchive(id);
    dispatch(
      api.util.invalidateTags([{ type: "Notes", id: sectionName?.toString() }])
    );
    setCurrentNote(null);
  };

  const { setCurrentNote } = useActions();

  const [open, setOpen] = useState(false);

  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  const handleActionBtnClick = (e: MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <div
      className={`${styles.root} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <div className={styles.header}>
        <h4 className={styles.title}>{name}</h4>
        <span className={styles.action_btn} onClick={handleActionBtnClick}>
          <img src="/img/more.svg" alt="more" />
        </span>

        <ul
          ref={domNode}
          className={`${styles.actions} ${open ? styles.open : ""}`}
        >
          {sectionName !== "Архив" && (
            <li onClick={handleToArchiveNote}>
              <img src="/img/archive-icon.svg" height={12} alt="" />
              <a>Добавить в архив</a>
            </li>
          )}
          <li
            className={styles.delete_action}
            onClick={(e) => handleDeleteNote(e)}
          >
            <img src="/img/delete-icon.svg" height={12} alt="" />
            <a>Удалить</a>
          </li>
        </ul>
      </div>

      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <span key={index}>{tag.name}</span>
        ))}
      </div>
      <p className={styles.description}>
        {description && description.length > 72
          ? description.substring(0, 72) + "..."
          : description}
      </p>
      <div className={styles.date}>
        <img src="/img/date.svg" alt="time" />
        <p>{date}</p>
      </div>
    </div>
  );
};

export default NoteItem;
