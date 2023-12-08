import { useState } from "react";
import styles from "../../pages/auth/auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginMutation } from "../../app/api/auth/auth.api";
import { ILoginRequest } from "../../app/api/auth/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../Common/Error/ErrorMessage";
import { loginSchema } from "../../app/validations/authSchemas";

const eyeIconUrl = "/img/eye.svg";
const closeEyeIconUrl = "/img/close-eye.svg";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<ILoginRequest> = (data) => {
    login(data)
      .unwrap()
      .then((_) => {
        navigate("/");
      }) //is success
      .catch((rejected) => setError(rejected.data.title)); //is error
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {error && <ErrorMessage text={error} />}

      <div className={styles.input_container}>
        <input {...register("username")} type="text" placeholder="Логин" />
      </div>
      {errors?.username && (
        <span className={styles.error}>{errors.username.message}</span>
      )}

      <div className={styles.input_container}>
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
        />
        <span className={styles.password_eye} onClick={handleClickShowPassword}>
          <img
            src={showPassword ? closeEyeIconUrl : eyeIconUrl}
            width="21px"
            alt="password-eye"
          />
        </span>
      </div>
      {errors?.password && (
        <span className={styles.error}>{errors.password.message}</span>
      )}

      <button type="submit">Войти</button>
      <span className={styles.link}>
        Ещё нет аккаунта?<Link to={"/register"}>Зарегистрироваться</Link>
      </span>
    </form>
  );
};

export default LoginForm;
