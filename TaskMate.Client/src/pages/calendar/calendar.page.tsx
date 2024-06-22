import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../app/utils/decodeToken";
import { getAccessToken } from "../../app/utils/getAccessToken";
import { logout } from "../../app/utils/logout";
import Navbar from "../../components/Layout/Navbar";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./calendar.module.scss";
import EventItem from "../../components/Calendar/EventItem/EventItem";

const CalendarPage = () => {
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

  const [onEvent, setOnEvent] = useState(false);

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
            <h2>Календарь</h2>
            <div className={styles.controls}>
              <button
                onClick={() => navigate("/calendar")}
                className={styles.active}
              >
                Календарь
              </button>
              {role === "Admin" && (
                <button onClick={() => navigate("/admin")}>Админ панель</button>
              )}
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.sections}>
              <div>
                <div className={styles.control}>
                  <p>Май 2024</p>
                  <div>
                    <img src="./img/arrow-up.svg" />
                    <img src="./img/arrow-down.svg" />
                  </div>
                </div>
                <img
                  onClick={() => setOnEvent(true)}
                  src="./img/calendar.png"
                  alt="calendar"
                />
              </div>
              {onEvent && <EventItem />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalendarPage;
