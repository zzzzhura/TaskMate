import styles from "./eventItem.module.scss";

const EventItem = () => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>18 мая, Суббота</h2>
      <div className={styles.event}>
        <p>Машин день рождения</p>
        <button>X</button>
      </div>
      <div className={styles.event}>
        <p>Форум по программированию</p>
        <button>X</button>
      </div>
    </div>
  );
};

export default EventItem;
