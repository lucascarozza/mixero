import styles from "./ConvertPlaylists.module.css";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Container from "../../components/Container/Container";

const ConvertPlaylists = () => {
  return (
    <section className={styles.contentWrapper}>
      <SectionTitle>Convert Playlists</SectionTitle>
      <Container></Container>
    </section>
  );
};

export default ConvertPlaylists;