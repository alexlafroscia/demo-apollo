import { ApolloServer } from "apollo-server";
import { merge } from "lodash";

import * as Person from "./types/Person";
import * as Job from "./types/Job";
import Query from "./query";
import Mutation from "./mutation";

const PORT = process.env["PORT"] || 5000;
const server = new ApolloServer({
  typeDefs: [Person.typeDef, Job.typeDef, Query, Mutation],
  resolvers: merge(Person.resolvers, Job.resolvers)
});

server.listen(PORT).then(({ url }) => {
  console.log(`Server started at ${url}`);
});
