import sortBy from "lodash.sortby";
import { getAllNodes, withCache } from ".";
import { GraphQLClient } from "../client";
import { GetIssueLabelsDocument } from "../operations";

export const getIssueLabels = (client: GraphQLClient) => {
  return withCache("issueLabels", async () => {
    const nodes = await getAllNodes(async () => {
      return (await client.query(GetIssueLabelsDocument, { first: 250 }))
        .issueLabels;
    });
    return sortBy(nodes, "name");
  });
};
