import { setContext } from "apollo-link-context";

export default (token: string | undefined) =>
  setContext((_, { headers, ...context }) => {
    return {
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}`, stateless: true } : {}),
      },
      ...context,
    };
  });
