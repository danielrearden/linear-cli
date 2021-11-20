import { Connection } from "../types";

export const getAllNodes = async <T>(
  getConnection: (after: string | null) => Promise<Connection<T>>
) => {
  let connection = await getConnection(null);
  let hasNext = connection.pageInfo.hasNextPage;
  const nodes = connection.nodes;

  while (hasNext) {
    connection = await getConnection(connection.pageInfo.endCursor!);
    hasNext = connection.pageInfo.hasNextPage;
    nodes.push(...connection.nodes);
  }

  return nodes;
};
