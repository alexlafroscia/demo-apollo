import { gql } from "apollo-server";
import DB from "../utils/db";

interface Job {
  id: number;
  title: string;
}

export const jobs = new DB<Job>(
  { id: 1, title: "Software Engineer" },
  { id: 2, title: "Graphic Designer" }
);

export const typeDef = gql`
  input JobIdentifierInput {
    id: Int!
  }

  type Job {
    id: Int!
    title: String!
  }
`;

export const resolvers = {
  Query: {
    jobs: () => jobs,
    job: (_obj, { id }) => jobs.where({ id })
  }
};
