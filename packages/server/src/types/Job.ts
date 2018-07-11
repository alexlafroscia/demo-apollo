import { gql } from "apollo-server";
import DB from "../utils/db";

interface Job {
  id: number;
  title: string;
}

export const jobs = new DB<Job>({ id: 1, title: "Software Engineer" });

export const typeDef = gql`
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
