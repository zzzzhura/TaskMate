import { FC, useEffect, useState } from "react";
import styles from "./note.module.scss";
import {
  useAddTagMutation,
  useRemoveCoverMutation,
  useWriteNoteMutation,
} from "../../../app/api/notes/notes.api";
import { selectAllTags } from "../../../app/api/tags/tags.api";
import { useDispatch, useSelector } from "react-redux";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { RootState } from "../../../app/store";
import { api } from "../../../app/api/api";
import ModalWindow from "../../Common/Modal/ModalWindow";
import LoadCoverForm from "./LoadCoverForm/LoadCoverForm";
import { useActions } from "../../../hooks/useActions";
import { usePDF } from "react-to-pdf";

interface NoteProps {
  id: number;
  title: string;
  noteText: string;
  tags: Tag[];
  image: ArrayBuffer;
}

const Note: FC<NoteProps> = ({ title, noteText, tags, id, image }) => {
  const { data: allTags } = useSelector((state: RootState) =>
    selectAllTags(state)
  );
  const dispatch = useDispatch();

  const { setCurrentNote } = useActions();
  const { sectionName, currentNote } = useSelector(
    (state: RootState) => state.main
  );

  const [file, setFile] = useState("");

  const { toPDF, targetRef } = usePDF({
    filename: `export_${currentNote?.title}.pdf`,
  });

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const [writeNote] = useWriteNoteMutation();
  const [text, setText] = useState("");

  const [addTag] = useAddTagMutation();

  const [isOpen, setIsOpen] = useState(false);

  const [open, setOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  useEffect(() => {
    setText(noteText);

    if (image) setImageSrc(`data:image/png;base64,${image}`);
  }, [id, image]);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    writeNote({ text: value, noteId: id });
  };

  const [imageSrc, setImageSrc] = useState("");
  const [removeCover] = useRemoveCoverMutation();
  const handleRemoveCover = () => {
    removeCover(id);
    setCurrentNote({ ...currentNote, image: null });
  };

  return (
    <>
      <div className={styles.root}>
        <div
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className={styles.cover}
          style={{
            background: image ? `url(${imageSrc})` : `rgb(220, 220, 220)`,
          }}
        >
          {isHovering && (
            <span>
              <button onClick={() => setIsOpen(true)}>Загрузить обложку</button>
              <button onClick={handleRemoveCover}>Удалить обложку</button>
            </span>
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <button onClick={() => toPDF()} className={styles.export_btn}>
              Экспорт в pdf⠀📑
            </button>
          </div>
          <div className={styles.tags}>
            {tags && tags.map((tag) => <span key={tag.name}>{tag.name}</span>)}
            <button
              className={styles.select_btn}
              onClick={() => setOpen(!open)}
            >
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
                    onClick={() => {
                      addTag({ tagId: tag.id, noteId: id });
                      dispatch(
                        api.util.invalidateTags([
                          { type: "Notes", id: sectionName?.toString() },
                        ])
                      );
                    }}
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            </button>
          </div>
          <textarea
            ref={targetRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Напишите что-нибудь..."
            className={styles.description}
            onBlur={handleBlur}
          />
        </div>
      </div>
      {isOpen && (
        <div className={styles.modal}>
          <ModalWindow title="Загрузите фото" setIsOpen={setIsOpen}>
            <LoadCoverForm
              file={file}
              setFile={setFile}
              noteId={id}
              setIsOpen={setIsOpen}
            />
          </ModalWindow>
        </div>
      )}
    </>
  );
};

export default Note;
