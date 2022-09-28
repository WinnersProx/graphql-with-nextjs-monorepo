import type { NextPage } from "next";
import LiveInspiration from "../src/components/LiveInsipiration";
import { useAuth } from "../src/user-contex";
import { withDataAndRouter } from "../src/utils/with-data";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { authenticateUser, isAuthenticated } = useAuth();

  return (
    <div className={styles.container}>
      <div style={{ margin: 30 }}>
        <h3>
          Greatest way to inspire!
        </h3>
      </div>

      <LiveInspiration />

      <div>
       { !isAuthenticated && <button onClick={authenticateUser}>Log me in</button> }
      </div>
    </div>
  );
};

export default withDataAndRouter(Home);
