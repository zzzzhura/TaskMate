import * as Yup from "yup";

export const createNoteSchema = Yup.object().shape({
    title: Yup.string()
      .strict()
      .trim("Уберите лишние пробелы")
      .required("Поле не должно быть пустым"),
  });