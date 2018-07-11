import { gql } from "apollo-server";
import { jobs } from "./Job";
import DB from "../utils/db";

interface Person {
  id: number;
  name: string;
  _jobId?: number;
  friends: Person[];
}

const alex: Person = { id: 1, name: "Alex", _jobId: 1, friends: [] };
const emily: Person = { id: 2, name: "Emily", _jobId: 1, friends: [] };

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
    greeting(obj: Person) {
      return `Hello from ${obj.name}!`;
    },

    job({ _jobId }) {
      return jobs.where({ id: _jobId });
    }
  },
  Mutation: {
    updatePerson(_obj, { id, person: { name } }) {
      let person = people.where({ id });
      person.name = name;

      return person;
    },

    linkJobToPerson(_obj, { id, job }) {
      let person = people.where({ id });
      person._jobId = job.id;

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
