import SideMenu from "./components/SideMenu/SideMenu";
import styles from "./App.module.css";

// Pages
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <SideMenu />
      <div className={styles.contentWrapper}>
        <Home />
      </div>
    </div>
  );
};

export default App;
