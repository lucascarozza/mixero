import SideMenu from "./components/SideMenu/SideMenu";
import styles from "./App.module.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import Help from "./pages/Help/Help";
import ManagePlaylists from "./pages/ManagePlaylists/ManagePlaylists";
import ConvertPlaylists from "./pages/ConvertPlaylists/ConvertPlaylists";

const App = () => {
  return (
    <Router>
      <div className={styles.appWrapper}>
        <SideMenu />
        <div className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/manage-playlists" element={<ManagePlaylists />} />
            <Route path="/convert-playlists" element={<ConvertPlaylists />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
