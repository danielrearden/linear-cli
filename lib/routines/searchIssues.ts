import { GraphQLClient } from "../client";
import { SearchIssuesDocument } from "../operations";

export const searchIssues = async (client: GraphQLClient, query: string) => {
  return (await client.query(SearchIssuesDocument, { query })).issueSearch
    .nodes;
};
