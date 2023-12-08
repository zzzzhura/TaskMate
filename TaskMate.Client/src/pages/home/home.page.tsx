import Navbar from "../../components/Layout/Navbar";
import PreviewPanel from "../../components/PreviewPanel/PreviewPanel";
import Workspace from "../../components/Workspace/Workspace";
import styles from "./home.module.scss";

const HomePage = () => {
  return (
    <div className={styles.root}>
      <Navbar />
      <PreviewPanel />
      <Workspace />
    </div>
  );
};

export default HomePage;
