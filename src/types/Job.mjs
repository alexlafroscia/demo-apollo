import Apollo from "apollo-server";
import DB from "../utils/db";

const { gql } = Apollo;

export const jobs = new DB({ id: 1, title: "Software Engineer" });

export const typeDef = gql`
  type Job {
    id: Int!
    title: String!
  }
`;

export const resolvers = {
  Query: {
    jobs: () => jobs,
    job: (_obj, { id }) => jobs.find(job.id === id)
  }
};
