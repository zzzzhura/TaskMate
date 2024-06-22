import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAddUserRequest, IAddUserForm } from "../../app/api/auth/types/user";
import { addUserSchema } from "../../app/validations/authSchemas";
import { useAddAccountMutation } from "../../app/api/auth/auth.api";
import { useState } from "react";
import ErrorMessage from "../Common/Error/ErrorMessage";
import styles from "./adminUserForm.module.scss";

const AddUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { },
  } = useForm<IAddUserForm>({
    mode: "onChange",
    resolver: yupResolver(addUserSchema),
  });

  const [addAccount] = useAddAccountMutation();

  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<IAddUserForm> = (data) => {
    const role = data.isAdmin ? "Admin" : "Client";
    const request: IAddUserRequest = { username: data.username, role: role, password: data.password, email: data.email};

    console.log(request);
    console.log(data);

    addAccount(request)
      .unwrap()
      .then((_) => {}) //is success
      .catch((rejected) => setError(rejected.data.title)); //is error
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <ErrorMessage text={error} />}

        <div className={styles.input_container}>
          <input
            {...register("username")}
            type="text"
            placeholder="Имя пользователя"
          />
        </div>

        <div className={styles.input_container}>
          <input {...register("password")} type="text" placeholder="Пароль" />
        </div>

        <div className={styles.input_container}>
          <input {...register("email")} type="text" placeholder="Почта" />
        </div>

        <div className={styles.input_container}>
          <input {...register("isAdmin")} type="checkbox" />
          <label>Админ</label>
        </div>

        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default AddUserForm;
