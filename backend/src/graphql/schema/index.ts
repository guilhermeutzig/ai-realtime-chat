import { gql } from "apollo-server-micro";

import customSchema from "./custom";
import noteSchema from "./note";

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, customSchema, noteSchema];
