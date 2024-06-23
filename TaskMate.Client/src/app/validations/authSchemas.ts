import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  username: Yup.string()
    .strict()
    .trim("Уберите лишние пробелы")
    .required("Укажите ваше имя"),
  password: Yup.string()
    .strict()
    .trim("Пароль не может содержать пробелы")
    .required(
      "Придумайте пароль от 6 до 20 символов, используйте буквы, цифры, символы"
    )
    .matches(
      /^([ a-zA-Z0-9@ *#])/,
      "Используйте буквы латинского алфавита, цифры и символы"
    )
    .min(6, "Пароль слишком короткий")
    .max(20, "Пароль слишком длинный"),
  confirmPassword: Yup.string()
    .required("Подтвердите ваш пароль")
    .oneOf([Yup.ref("password")], "Пароли не совпадают"),
});

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .strict()
    .trim("Уберите лишние пробелы")
    .required("Укажите ваше имя"),
  password: Yup.string()
    .strict()
    .trim("Пароль не может содержать пробелы")
    .required(
      "Придумайте пароль от 6 до 20 символов, используйте буквы, цифры, символы"
    )
    .matches(
      /^([ a-zA-Z0-9@ *#])/,
      "Используйте буквы латинского алфавита, цифры и символы"
    )
    .min(6, "Пароль слишком короткий")
    .max(20, "Пароль слишком длинный"),
});

export const addUserSchema = Yup.object().shape({
  username: Yup.string()
    .strict()
    .trim("Уберите лишние пробелы")
    .required("Укажите ваше имя"),
  password: Yup.string()
    .strict()
    .trim("Пароль не может содержать пробелы")
    .required(
      "Придумайте пароль от 6 до 20 символов, используйте буквы, цифры, символы"
    )
    .matches(
      /^([ a-zA-Z0-9@ *#])/,
      "Используйте буквы латинского алфавита, цифры и символы"
    )
    .min(6, "Пароль слишком короткий")
    .max(20, "Пароль слишком длинный"),
  email: Yup.string(),
});
