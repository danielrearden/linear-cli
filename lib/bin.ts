import inquirer from "inquirer";
import inquirerAutoComplete from "inquirer-autocomplete-prompt";
import yargs from "yargs";
import { add, branch, clear, login, logout, status } from "./commands";

inquirer.registerPrompt("autocomplete", inquirerAutoComplete);

yargs(process.argv.slice(2))
  .scriptName("linear")
  .command(...login)
  .command(...logout)
  .command(...add)
  .command(...branch)
  .command(...status)
  .command(...clear)
  .completion("completion", "Generate completion script.")
  .help().argv;
