import SideMenu from "./components/SideMenu/SideMenu";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import Help from "./pages/Help/Help";

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
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
