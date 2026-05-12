import styles from "../styles/AboutPage.module.css";

export default function AboutPage() {
  return (
    <div className={styles.glassBackground}>
      <h1>About this project:</h1>
      <p>
        This is a project meant to display competency with React, Vite,
        Api-calls, and routes.
      </p>
      <p>
        After just 3 months learning html, css, js and react, this admittedly
        felt like a challenge.
      </p>
      <p>
        Now looking forward to express and next.js, meant as the backend part of
        Kodehodes fullstack course.
      </p>
    </div>
  );
}
