import sortBy from "lodash.sortby";
import { getAllNodes, withCache } from ".";
import { GraphQLClient } from "../client";
import { GetTeamsDocument } from "../operations";

export const getTeams = (client: GraphQLClient) => {
  return withCache("teams", async () => {
    const nodes = await getAllNodes(async () => {
      return (await client.query(GetTeamsDocument, { first: 250 })).teams;
    });
    return sortBy(nodes, "name");
  });
};
