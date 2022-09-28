import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContext from "../src/user-contex";
import { useState } from "react";
import { User } from "../../common/types";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null | undefined>(null);

  return (
    <UserContext.Provider value={{ user }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
