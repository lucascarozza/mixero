import styles from "./Home.module.css";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Container from "../../components/Container/Container";

const Home = () => {
  return (
    <section className={styles.container}>
      <SectionTitle>Create Spotify Playlists</SectionTitle>
      <Container>
        <div></div>
        <div></div>
      </Container>
    </section>
  );
}; 

export default Home;
