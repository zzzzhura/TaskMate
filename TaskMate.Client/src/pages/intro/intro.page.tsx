import { useState, useEffect } from "react";
import { decodeToken } from "../../app/utils/decodeToken";
import { getAccessToken } from "../../app/utils/getAccessToken";
import Navbar from "../../components/Layout/Navbar";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./intro.module.scss";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/utils/logout";

const IntroPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const [open, setOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setOpen(false);
  });

  useEffect(() => {
    const token = getAccessToken();
    setName(token ? decodeToken(token).given_name : "");
    setRole(token ? decodeToken(token).role : "");
  }, [name, role]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.root}>
      <Navbar />

      <div className={styles.content}>
        <div className={styles.profile} onClick={() => setOpen(true)}>
          <p>{name}</p>
          <img src="/img/account_circle.svg" alt="account" />
          <ul
            ref={domNode}
            className={`${styles.actions} ${open ? styles.open : ""}`}
          >
            <li className={styles.exit_action} onClick={handleLogout}>
              <img src="/img/exit.svg" height={18}></img>
              <a>Выйти</a>
            </li>
          </ul>
        </div>
        <main>
          <div className={styles.header}>
            <h2>Привет {name}!</h2>
            <div className={styles.controls}>
              <button onClick={() => navigate("/calendar")}>Календарь</button>
              {role === "Admin" && (
                <button
                  className={styles.active}
                  onClick={() => navigate("/admin")}
                >
                  Админ панель
                </button>
              )}
            </div>
          </div>
          <div className={styles.main}>
            <img src="./img/intro.png"></img>
            <div className={styles.control}>
              <p>
                Личная эффективность – это способность человека достигать
                поставленных целей и задач с максимальной производительностью и
                минимальными затратами ресурсов.{" "}
              </p>
              <p>
                Это комплексное понятие, включающее в себя умение планировать
                свое время, расставлять приоритеты, контролировать выполнение
                задач, а также умение работать с информацией и анализировать
                результаты своей деятельности.{" "}
              </p>

              <button
                className={styles.note_btn}
                onClick={() => navigate("/home")}
              >
                Создать заметку
              </button>
              <button
                className={styles.task_btn}
                onClick={() => navigate("/home")}
              >
                Создать задачу
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IntroPage;
