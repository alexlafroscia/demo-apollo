import { gql } from "apollo-server";

const typeDef = gql`
  type Mutation {
    updatePerson(id: Int!, person: PersonInput!): Person

    linkJobToPerson(id: Int!, job: JobIdentifierInput!): Person
  }
`;

export default typeDef;
