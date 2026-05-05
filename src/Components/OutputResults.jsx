import { useApiFetch } from "../Logic/ApiFetch";
import styles from "../styles/OutputResults.module.css";
export default function OutputResults() {
  const { data, loading } = useApiFetch();
  console.log("RENDER", data);
  const books = data.results || [];

  return (
    <div>
      {loading && <p className={styles.loading}>Loading...</p>}
      <div className={styles.layout}>
        {books.map((result, index) => (
          <div className={styles.card} key={index}>
            <img
              className={styles.image}
              src={result.formats["image/jpeg"]}
              alt={result.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
