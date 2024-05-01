import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    getAllNotes: [Note!]
    getNote(_id: ID!): Note
  }

  extend type Mutation {
    saveNote(title: String!, content: String!): Note
    updateNote(_id: ID!, title: String!, content: String!): Note
    deleteNote(_id: ID!): Boolean
  }

  type Note {
    id: ID!
    title: String!
    content: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
