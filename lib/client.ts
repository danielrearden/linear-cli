import {
  ResultOf,
  TypedDocumentNode,
  VariablesOf,
} from "@graphql-typed-document-node/core";
import got from "got";
import { ExecutionResult, print } from "graphql";

export class GraphQLClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async query<T extends TypedDocumentNode<any, any>>(
    query: T,
    variables?: VariablesOf<T>
  ): Promise<
    Exclude<
      ExecutionResult<ResultOf<T>, Record<string, any>>["data"],
      null | undefined
    >
  > {
    const source = print(query);
    const { body } = await got<any>({
      headers: {
        Authorization: this.apiKey,
      },
      json: {
        query: source,
        variables,
      },
      method: "POST",
      responseType: "json",
      url: `https://api.linear.app/graphql`,
    });

    if (body.errors) {
      throw new Error("Failed to execute GraphQL operation.");
    }

    return body.data;
  }
}
