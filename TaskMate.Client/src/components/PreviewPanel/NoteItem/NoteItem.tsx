import { FC, useState } from "react";
import styles from "./noteItem.module.scss";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useDeleteNoteMutation, useMoveToArchiveMutation } from "../../../app/api/notes/notes.api";

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
  const [deleteNote] = useDeleteNoteMutation();
  const [moveToArchive] = useMoveToArchiveMutation();

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
        <h4 className={styles.title}>{name}</h4>
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
          <li onClick={() => moveToArchive(id)}>
            <img src="/img/archive-icon.svg" height={12} alt="" />
            <a>Добавить в архив</a>
          </li>
          <li className={styles.delete_action} onClick={() => deleteNote(id)}>
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
      <p className={styles.description}>{description}</p>
      <div className={styles.date}>
        <img src="/img/date.svg" alt="time" />
        <p>{date}</p>
      </div>
    </div>
  );
};

export default NoteItem;
