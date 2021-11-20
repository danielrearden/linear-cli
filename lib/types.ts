export type Connection<T> = {
  nodes: Array<T>;
  pageInfo: {
    endCursor?: string | null;
    hasNextPage: boolean;
  };
};

export type Issue = {
  id: string;
  title: string;
  identifier: string;
  branchName: string;
  url: string;
  team: {
    id: string;
  };
};
