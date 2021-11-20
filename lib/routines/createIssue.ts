import { VariablesOf } from "@graphql-typed-document-node/core";
import { GraphQLClient } from "../client";
import { CreateIssueDocument } from "../operations";

export const createIssue = async (
  client: GraphQLClient,
  input: VariablesOf<typeof CreateIssueDocument>["input"]
) => {
  const { issue } = (await client.query(CreateIssueDocument, { input }))
    .issueCreate;

  if (!issue) {
    throw new Error("Failed to create new issue.");
  }

  return issue;
};
