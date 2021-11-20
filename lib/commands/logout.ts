import chalk from "chalk";
import keytar from "keytar";
import { KEYCHAIN_ACCOUNT, KEYCHAIN_SERVICE } from "../constants";

export const logout = [
  "logout",
  "Remove API key from keychain.\n",
  {},
  async () => {
    await keytar.deletePassword(KEYCHAIN_SERVICE, KEYCHAIN_ACCOUNT);
    console.log(
      chalk.green("Your API key has been removed from the keychain.")
    );
  },
] as const;
