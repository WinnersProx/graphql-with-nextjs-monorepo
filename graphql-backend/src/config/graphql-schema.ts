import gql from 'graphql-tag';

// Read the complete docs for graphql-tools here:
// http://dev.apollodata.com/tools/graphql-tools/generate-schema.html

/*
  Schema properties are in following order:
    Alphabetical
    Resolved fields (requires extra db work)

  Comments are provided when property is not obvious
*/
export const typeDefs = gql(`
  scalar Date

  scalar Any

  type Inspiration {
    id: Int!

    creationTime: Date!

    author: String!

    quote: String!
  }

  # the schema allows the following queries:
  type Query {
    # A comment, it's parent could be another comment or a news item.
    getInspired: Inspiration
  }

  type Mutation {
    loginUser (
      username: String
      password: String
    ): User
  }
`);
