import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../app/utils/decodeToken";
import { getAccessToken } from "../../app/utils/getAccessToken";
import { logout } from "../../app/utils/logout";
import Navbar from "../../components/Layout/Navbar";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./admin.module.scss";
import { useGetAccountsQuery } from "../../app/api/auth/auth.api";
import AddUserForm from "../../components/Admin/AddUserForm";

const AdminPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const { data: accounts } = useGetAccountsQuery();

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
            <h2>Админ панель</h2>
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
            <table>
              <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
              {accounts?.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.username}</td>
                  <td>{account.email}</td>
                  <td>{account.role}</td>
                </tr>
              ))}
            </table>
            <div className={styles.form}>
              <AddUserForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
