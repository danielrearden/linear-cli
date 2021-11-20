import { VariablesOf } from "@graphql-typed-document-node/core";
import { GraphQLClient } from "../client";
import { UpdateIssueDocument } from "../operations";

export const updateIssue = async (
  client: GraphQLClient,
  id: string,
  input: VariablesOf<typeof UpdateIssueDocument>["input"]
) => {
  await client.query(UpdateIssueDocument, { id, input });
};
