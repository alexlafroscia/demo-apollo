import Apollo from "apollo-server";
import { jobs } from "./Job";
import DB from "../utils/db";

const { gql } = Apollo;

const alex = { id: 1, name: "Alex", _jobId: 1 };
const emily = { id: 2, name: "Emily", _jobId: 1 };

alex.friends = [emily];
emily.friends = [alex];

const people = new DB(alex, emily);

export const typeDef = gql`
  input PersonInput {
    name: String
  }

  type Person {
    id: Int!
    name: String
    friends: [Person]
    greeting: String
    job: Job
  }
`;

export const resolvers = {
  Person: {
    greeting(obj) {
      return `Hello from ${obj.name}!`;
    },

    job({ _jobId }) {
      return jobs.where({ id: _jobId });
    }
  },
  Mutation: {
    updatePerson(
      _obj,
      {
        id,
        person: { name }
      }
    ) {
      let person = people.where({ id });
      person.name = name;

      return person;
    }
  },
  Query: {
    people: () => people,
    person(_obj, { id }) {
      return people.where({ id });
    }
  }
};
