import Apollo from "apollo-server";

const { gql } = Apollo;

const typeDef = gql`
  type Mutation {
    updatePerson(id: Int!, person: PersonInput!): Person
  }
`;

export default typeDef;
