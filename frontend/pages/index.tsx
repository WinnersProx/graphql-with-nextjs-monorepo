import type { NextPage } from "next";
import { useLazyQuery } from "react-apollo";
import LiveInspiration from "../src/components/LiveInsipiration";
import { useAuth } from "../src/user-contex";
import { fetchInspirationQuery } from "../src/utils/queries";
import { withDataAndRouter } from "../src/utils/with-data";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  // Use top wrapper in __app.tsx to include the auth user
  
  const { authenticateUser, isAuthenticated } = useAuth();
  const [queryLiveInspiration, { data, loading, error }] = useLazyQuery(fetchInspirationQuery, {
    onCompleted: (d) => {
      console.log('data', d)
    }
  });

  const authenticate = () => {
    authenticateUser().then(() => {
      queryLiveInspiration({ variables: {} })
    });
  }

  return (
    <div className={styles.container}>
      <div style={{ margin: 30 }}>
        <h3>
          Greatest way to inspire!
        </h3>
      </div>

      {/* <LiveInspiration /> */}

      <div>
        <button onClick={authenticate}>Log me in</button>
      </div>
    </div>
  );
};

export default withDataAndRouter(Home);
