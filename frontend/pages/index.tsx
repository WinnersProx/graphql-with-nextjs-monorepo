import type { NextPage } from "next";
import { useLazyQuery } from "react-apollo";
import LiveInspiration from "../src/components/LiveInsipiration";
import { useAuth } from "../src/user-contex";
import { fetchInspirationQuery } from "../src/utils/queries";
import { withDataAndRouter } from "../src/utils/with-data";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  // Use top wrapper in __app.tsx to include the auth user
  const { authenticateUser } = useAuth();
  const [queryLiveInspiration] = useLazyQuery(fetchInspirationQuery, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    onCompleted: (dt) => {
      console.log("data", dt);
    },
  });

  return (
    <div className={styles.container}>
      <div style={{ margin: 30 }}>
        <h3>Greatest way to inspire!</h3>
      </div>

      <div>
        <button onClick={authenticateUser}>Log me in</button>
      </div>
      <br />

      <br />
      <div>
        <button onClick={() => queryLiveInspiration({ variables: {} })}>
          Load LiveInspiration
        </button>
      </div>

      <br />

      <LiveInspiration />
    </div>
  );
};

export default withDataAndRouter(Home);
