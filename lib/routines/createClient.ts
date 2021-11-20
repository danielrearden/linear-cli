import chalk from "chalk";
import keytar from "keytar";
import { GraphQLClient } from "../client";
import { KEYCHAIN_ACCOUNT, KEYCHAIN_SERVICE } from "../constants";

export const createClient = async () => {
  const apiKey = await keytar.getPassword(KEYCHAIN_SERVICE, KEYCHAIN_ACCOUNT);
  if (!apiKey) {
    console.log(chalk.red('No API key found. Did you run "linear login"?'));
    process.exit(1);
  }

  return new GraphQLClient(apiKey);
};
