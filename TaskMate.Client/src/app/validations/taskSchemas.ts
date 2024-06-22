import * as Yup from "yup";

export const createTaskSchema = Yup.object().shape({
  text: Yup.string()
    .strict()
    .trim("Уберите лишние пробелы")
    .required("Поле не должно быть пустым"),
});
