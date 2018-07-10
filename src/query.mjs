import Apollo from "apollo-server";

const { gql } = Apollo;

const typeDef = gql`
  type Query {
    people: [Person]
    person(id: Int!): Person

    jobs: [Job]
    job(id: Int!): Job
  }
`;

export default typeDef;
