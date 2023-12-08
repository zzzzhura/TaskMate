import * as Yup from "yup";

export const createTagSchema = Yup.object().shape({
    name: Yup.string()
      .strict()
      .trim("Уберите лишние пробелы")
      .required("Поле не должно быть пустым"),
  });