import { gql } from "apollo-server";

const typeDef = gql`
  type Query {
    people: [Person]
    person(id: Int!): Person

    jobs: [Job]
    job(id: Int!): Job
  }
`;

export default typeDef;
