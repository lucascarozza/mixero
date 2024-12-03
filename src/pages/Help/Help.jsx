import styles from "./Help.module.css";
import { faqData } from "./faqData";

const Help = (props) => {
  return (
    <section className={styles.contentWrapper}>
      <h2 className={styles.pageTitle}>Help</h2>
      {faqData.map((item, index) => {
        return (
          <details className={styles.question} key={index} open={index === 0}>
            <summary className={styles.title}>{item.question}</summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        );
      })}
    </section>
  );
};

export default Help;
