import { gql } from "apollo-server-micro";

const customTypeDefs = gql`
  scalar Date
  scalar Time
  scalar DateTime
`;

export default customTypeDefs;
