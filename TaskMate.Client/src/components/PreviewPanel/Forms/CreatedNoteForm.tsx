import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { CreateNoteRequest } from "../../../app/api/notes/types/requests";
import { createNoteSchema } from "../../../app/validations/noteSchemas";
import { useCreateNoteMutation } from "../../../app/api/notes/notes.api";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../../app/api/api";
import { RootState } from "../../../app/store";


interface CreatedNoteFormProps {
    setIsOpen: (isOpen: boolean) => void;
  }

const CreatedNoteForm: FC<CreatedNoteFormProps> = ({setIsOpen}) => {
  const dispatch = useDispatch();
  const { sectionName } = useSelector((state: RootState) => state.main);
  
  const [createNote] = useCreateNoteMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteRequest>({
    mode: "onChange",
    resolver: yupResolver(createNoteSchema),
  });

  const onSubmitNote: SubmitHandler<CreateNoteRequest> = (data) => {
    createNote(data);
    dispatch(
      api.util.invalidateTags([
        { type: "Notes", id: sectionName?.toString() },
      ])
    );
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitNote)}>
      <p>Укажите название заметки</p>
      <input
        {...register("title")}
        type="text"
        placeholder="Название (изначально пустое поле)"
      />
      {errors?.title && (
        <div className="error">{errors.title.message}</div>
      )}
      <button type="submit">Готово</button>
    </form>
  );
};

export default CreatedNoteForm;
