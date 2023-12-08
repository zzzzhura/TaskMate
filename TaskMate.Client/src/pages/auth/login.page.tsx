import LoginForm from "../../components/Auth/LoginForm";
import styles from "./auth.module.scss";

const LoginPage = () => {
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
          <LoginForm/>
        </div>
      </main>
      <div className={styles.bg}></div>
    </div>
  );
};

export default LoginPage;
