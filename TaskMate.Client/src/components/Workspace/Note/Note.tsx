import { FC, useEffect, useState } from "react";
import styles from "./note.module.scss";
import {
  useAddTagMutation,
  useWriteNoteMutation,
} from "../../../app/api/notes/notes.api";
import { selectAllTags } from "../../../app/api/tags/tags.api";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { RootState } from "../../../app/store";

interface NoteProps {
  id: number;
  title: string;
  noteText: string;
  tags: Tag[];
}

const Note: FC<NoteProps> = ({ title, noteText, tags, id }) => {
  const { data: allTags } = useSelector((state: RootState) =>
    selectAllTags(state)
  );
  const [writeNote] = useWriteNoteMutation();
  const [text, setText] = useState("");

  const [addTag] = useAddTagMutation();

  const [open, setOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  useEffect(() => {
    setText(noteText);
  }, [id]);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    writeNote({ text: value, noteId: id });
  };

  return (
    <div className={styles.root}>
      <div className={styles.cover}>
        <span>
          <button>Загрузить обложку</button>
          <button>Удалить обложку</button>
        </span>
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.tags}>
          {tags && tags.map((tag) => <span key={tag.name}>{tag.name}</span>)}
          <button className={styles.select_btn} onClick={() => setOpen(!open)}>
            ╋
            <ul
              ref={domNode}
              className={`${styles.actions} ${open ? styles.open : ""}`}
            >
              <li className={styles.options_header}>
                <p>Выберите тег</p>
                <b>&#9660;</b>
              </li>
              {allTags?.map((tag) => (
                <li
                  key={tag.id}
                  onClick={() => addTag({ tagId: tag.id, noteId: id })}
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          </button>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Напишите что-нибудь..."
          className={styles.description}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default Note;
