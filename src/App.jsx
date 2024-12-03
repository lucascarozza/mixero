import SideMenu from "./components/SideMenu/SideMenu";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Router>
      <div className={styles.appWrapper}>
        <SideMenu />
        <div className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manage-playlists" />
            <Route path="/convert-playlists" />
            <Route path="/account" />
            <Route path="/help" />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
