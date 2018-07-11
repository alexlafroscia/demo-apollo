import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { alias, oneWay } from "@ember/object/computed";

import { task } from "ember-concurrency";

import getAllJobs from "demo-apollo-client/gql/queries/jobs";
import updatePerson from "demo-apollo-client/gql/mutations/update-person";
import associateJob from "demo-apollo-client/gql/mutations/associate-job";

export default Controller.extend({
  apollo: service(),

  person: alias("model"),
  bufferedName: oneWay("person.name"),

  editingJob: false,
  loadJobs: task(function*() {
    return yield this.apollo.query({ query: getAllJobs }, "jobs");
  }),

  actions: {
    async updateName({ target: { value } }) {
      let variables = {
        id: this.person.id,
        input: {
          name: value
        }
      };

      await this.apollo.mutate(
        { mutation: updatePerson, variables },
        "updatePerson"
      );
    },

    async setJob(job) {
      let variables = {
        id: this.person.id,
        job: {
          id: job.id
        }
      };

      await this.apollo.mutate(
        { mutation: associateJob, variables },
        "associateJob"
      );
    },

    editJob() {
      this.set("editingJob", true);
      this.loadJobs.perform();
    }
  }
});
