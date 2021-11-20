import { withCache } from ".";
import { GraphQLClient } from "../client";
import { GetViewerDocument } from "../operations";

export const getViewer = (client: GraphQLClient) => {
  return withCache("viewer", async () => {
    return (await client.query(GetViewerDocument)).viewer;
  });
};
