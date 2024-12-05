import styles from "./ManagePlaylists.module.css";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Container from "../../components/Container/Container";

const ManagePlaylists = () => {
  return (
    <section className={styles.contentWrapper}>
      <SectionTitle>Manage Playlists</SectionTitle>
      <Container></Container>
    </section>
  );
};

export default ManagePlaylists;