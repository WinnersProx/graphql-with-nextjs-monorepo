import gql from "graphql-tag";

export const fetchInspirationQuery = gql`
query getInspiredQuery {
    getInspired {
      id
      author
      quote
    }
}
`;