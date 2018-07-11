import Route from "@ember/routing/route";
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import query from "demo-apollo-client/gql/queries/person";

export default Route.extend(RouteQueryManager, {
  model({ id }) {
    const variables = { id, withJob: true };

    return this.get("apollo").watchQuery({ query, variables }, "person");
  }
});
