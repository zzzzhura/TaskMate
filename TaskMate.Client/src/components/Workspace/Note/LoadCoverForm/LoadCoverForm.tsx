import { FC, useState } from "react";
import styles from "./loadCoverForm.module.scss";
import { useSetCoverMutation } from "../../../../app/api/notes/notes.api";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { useActions } from "../../../../hooks/useActions";

interface LoadCoverFormProps {
  setFile: (fileStr: string) => void;
  setIsOpen: (isOpen: boolean) => void;
  file: string;
  noteId: number;
}

interface FormValues {
  image: File;
  noteId: number;
}

const LoadCoverForm: FC<LoadCoverFormProps> = ({
  setFile,
  file,
  noteId,
  setIsOpen,
}) => {
  const [setCover] = useSetCoverMutation();

  const [blob, setBlob] = useState<Blob>();

  const { setCurrentNote } = useActions();
  const { currentNote } = useSelector((state: RootState) => state.main);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(URL.createObjectURL(event.target.files![0]));
    setValue("image", event.target.files![0]);
    setBlob(event.target.files![0]);
  };

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data, e) => {
    e?.preventDefault();
    const formData = new FormData();
    formData.append("image", data.image);

    setCover({ formData: formData, noteId: noteId });
    setCurrentNote({ ...currentNote, image: await blob!.arrayBuffer() });

    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input_file_row}>
        <div className={styles.input_file_list}>
          <div className={styles.blank}>
            <img src="/img/no-image.png" alt="no-image" />
            <p>Изображение не указано</p>
          </div>
          {file && (
            <div className={styles.item}>
              <img src={file} />
              <span className={styles.remove} onClick={() => setFile("")}>
                x
              </span>
            </div>
          )}
        </div>
        <div>
          <label className={styles.input_file}>
            <input
              {...register("image")}
              type="file"
              name="file"
              accept="image/*"
              onChange={handleChange}
              disabled={file !== ""}
            />
            <span>{file ? "Файл выбран" : "Выберите файл"}</span>
          </label>
          <button style={{ marginLeft: "40px" }} type="submit">
            Загрузить
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoadCoverForm;

