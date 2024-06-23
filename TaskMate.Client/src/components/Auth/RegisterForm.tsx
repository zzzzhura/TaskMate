import { useState } from "react";
import styles from "../../pages/auth/auth.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../app/api/auth/auth.api";
import { registerSchema } from "../../app/validations/authSchemas";
import { IRegisterRequest } from "../../app/api/auth/types/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "../Common/Error/ErrorMessage";

const eyeIconUrl = "/img/eye.svg";
const closeEyeIconUrl = "/img/close-eye.svg";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [signUp] = useRegisterMutation();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterRequest>({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<IRegisterRequest> = (data) => {
    signUp(data);
    navigate("/login");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

      <div className={styles.input_container}>
        <input
          {...register("confirmPassword")}
          type={showPassword ? "text" : "password"}
          placeholder="Повторите пароль"
        />
        <span className={styles.password_eye} onClick={handleClickShowPassword}>
          <img
            src={showPassword ? closeEyeIconUrl : eyeIconUrl}
            width="21px"
            alt="password-eye"
          />
        </span>
      </div>
      {errors?.confirmPassword && (
        <span className={styles.error}>{errors.confirmPassword.message}</span>
      )}

      <button>Зарегистрироваться</button>
      <span className={styles.link}>
        Уже есть аккаунт?<Link to="/login">Войти</Link>
      </span>
    </form>
  );
};

export default RegisterForm;
