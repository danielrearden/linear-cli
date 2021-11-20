import { VariablesOf } from "@graphql-typed-document-node/core";
import { GraphQLClient } from "../client";
import { GetIssueDocument } from "../operations";

export const getIssue = async (
  client: GraphQLClient,
  filter: VariablesOf<typeof GetIssueDocument>["filter"]
) => {
  return (await client.query(GetIssueDocument, { filter })).issues.nodes[0];
};
