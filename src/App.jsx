import SearchBar from "./components/SearchBar/SearchBar";
import SideMenu from "./components/SideMenu/SideMenu";
import styles from "./App.module.css";

const App = () => {
    return (
        <div className={styles.appWrapper}>
            <SideMenu />
            <SearchBar />
        </div>
    )
}

export default App;