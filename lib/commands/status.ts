import chalk from "chalk";
import inquirer from "inquirer";
import { $ } from "zx";
import {
  createClient,
  getIssue,
  getWorkflowStates,
  searchIssues,
  updateIssue,
} from "../routines";
import { Issue } from "../types";

export const status = [
  "status",
  "Update the status of an issue. Uses the current git branch name to identify the issue to update when possible.\n",
  {},
  async () => {
    const client = await createClient();
    const workflowStates = await getWorkflowStates(client);

    let branchName: string | null = null;
    try {
      const { stdout } = await $`git symbolic-ref --short HEAD`;
      branchName = stdout.trim();
    } catch {
      // Do nothing
    }

    let issue: Issue | null = null;
    if (branchName) {
      const [[, teamKey, issueNumberRaw] = []] = Array.from(
        branchName.matchAll(/\w+\/(\w+)-(\d+)-.*/gi)
      );
      const issueNumber = issueNumberRaw && parseInt(issueNumberRaw, 10);

      if (teamKey && issueNumber) {
        issue = await getIssue(client, {
          and: [
            { team: { key: { eq: teamKey.toUpperCase() } } },
            { number: { eq: issueNumber } },
          ],
        });
      }
    }

    let issuesByLabel: Map<string, Issue> = new Map();

    const questions = [];

    if (!issue) {
      questions.push({
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

            issuesByLabel = new Map(
              issues.map((issue) => [
                `${issue.identifier} ${issue.title}`,
                issue,
              ])
            );

            return Array.from(issuesByLabel.keys());
          } catch (error) {
            return [];
          }
        },
      });
    }

    questions.push({
      name: "stateId",
      message: "Status",
      type: "list",
      choices: ({ label }: any) => {
        const teamId = (issue ?? issuesByLabel.get(label))?.team.id;

        return workflowStates
          .filter((workflowState) => workflowState.team.id === teamId)
          .map((workflowState) => ({
            name: workflowState.name,
            value: workflowState.id,
          }));
      },
      loop: false,
    });

    const { label, stateId } = await inquirer.prompt(questions);
    issue = issue ?? issuesByLabel.get(label)!;

    await updateIssue(client, issue.id, { stateId });
    console.log(
      chalk.green(
        `Issue ${issue!.identifier} has been updated and can be viewed at: `
      ) + chalk.underline(issue.url)
    );
  },
] as const;
