import type { NextPage } from "next";
import { withDataAndRouter } from "../src/utils/with-data";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div style={{ margin: 30 }}>
        <h3>
          Greatest way to get going with Apolo servers!
        </h3>
      </div>
    </div>
  );
};

export default withDataAndRouter(Home);
// export default Home;
