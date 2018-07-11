import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { alias, oneWay } from "@ember/object/computed";
import mutation from "demo-apollo-client/gql/mutations/update-person";

export default Controller.extend({
  apollo: service(),

  person: alias("model"),
  bufferedName: oneWay("person.name"),

  actions: {
    /**
     * Note: No need to update the `model` on the controller! The watched query
     * in the route will automatically update with the new state, pushed from the
     * server
     */
    async updateName({ target: { value } }) {
      let variables = {
        id: this.person.id,
        input: {
          name: value
        }
      };

      await this.apollo.mutate({ mutation, variables }, "updatePerson");
    }
  }
});
