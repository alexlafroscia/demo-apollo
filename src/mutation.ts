import { gql } from "apollo-server";

const typeDef = gql`
  type Mutation {
    updatePerson(id: Int!, person: PersonInput!): Person
  }
`;

export default typeDef;
