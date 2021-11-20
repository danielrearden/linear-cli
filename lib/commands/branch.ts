import inquirer from "inquirer";
import { $ } from "zx";
import { createClient, searchIssues } from "../routines";

export const branch = [
  "branch",
  "Create and checkout a new branch for a specific issue.\n",
  {},
  async () => {
    let branchNamesByLabel: Map<string, string> = new Map();
    const client = await createClient();
    const { label } = await inquirer.prompt([
      {
        name: "label",
        type: "autocomplete",
        message: "Search for an issue:",
        loop: false,
        emptyText: "No results.",
        source: async (_answers: any, query: string) => {
          if (!query) {
            return [];
          }
          try {
            const issues = await searchIssues(client, query);

            branchNamesByLabel = new Map(
              issues.map((issue) => [
                `${issue.identifier} ${issue.title}`,
                issue.branchName,
              ])
            );

            return Array.from(branchNamesByLabel.keys());
          } catch (error) {
            return [];
          }
        },
      },
    ]);

    const branchName = branchNamesByLabel.get(label);
    if (branchName) {
      await $`git checkout -b ${branchName}`;
    }
  },
] as const;
