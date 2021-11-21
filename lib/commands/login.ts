import chalk from "chalk";
import inquirer from "inquirer";
import keytar from "keytar";
import { KEYCHAIN_ACCOUNT, KEYCHAIN_SERVICE } from "../constants";
import { createClient, getViewer } from "../routines";

export const loginCommand = [
  "login",
  "Authenticate using personal API key. Generate a new API key at https://linear.app/contra/settings/api \n",
  {},
  async () => {
    const { apiKey } = await inquirer.prompt([
      {
        name: "apiKey",
        message: "Enter your personal API key",
        type: "password",
      },
    ]);
    await keytar.setPassword(KEYCHAIN_SERVICE, KEYCHAIN_ACCOUNT, apiKey);
    const client = await createClient();
    const viewer = await getViewer(client);
    console.log(
      chalk.green(
        `👋 Hi ${viewer.name}! Your API key has been saved in the keychain.`
      )
    );
  },
] as const;
