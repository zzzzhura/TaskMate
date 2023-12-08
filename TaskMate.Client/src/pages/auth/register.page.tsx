import RegisterForm from "../../components/Auth/RegisterForm";
import styles from "./auth.module.scss";

const RegisterPage = () => {
  return (
    <div className={styles.root}>
      <main>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="/img/icon.svg" className={styles.icon} alt="icon" />
            <img src="/img/title.svg" className={styles.word} alt="title" />
          </div>
          <h1 className={styles.title}>Добро пожаловать</h1>
          <p className={styles.subtitle}>
            В сервис по управлению личной эффективностью
          </p>
          <RegisterForm/>
        </div>
      </main>
      <div className={styles.bg}></div>
    </div>
  )
}

export default RegisterPage