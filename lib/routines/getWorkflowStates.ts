import sortBy from "lodash.sortby";
import { getAllNodes, withCache } from ".";
import { GraphQLClient } from "../client";
import { GetWorkflowStatesDocument } from "../operations";

export const getWorkflowStates = (client: GraphQLClient) => {
  return withCache("workflowStates", async () => {
    const nodes = await getAllNodes(async () => {
      return (await client.query(GetWorkflowStatesDocument, { first: 250 }))
        .workflowStates;
    });
    return sortBy(nodes, "name");
  });
};
