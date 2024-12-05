import styles from "./Help.module.css";
import { faqData } from "./faqData";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Container from "../../components/Container/Container";

const Help = (props) => {
  return (
    <section className={styles.contentWrapper}>
      <SectionTitle>Help</SectionTitle>
      <Container>
      {faqData.map((item, index) => {
        return (
          <details className={styles.questions} key={index} open={index === 0}>
            <summary className={styles.title}>{item.question}</summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        );
      })}
      </Container>
    </section>
  );
};

export default Help;
