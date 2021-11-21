import chalk from "chalk";
import inquirer from "inquirer";
import { $ } from "zx";
import { cache } from "../cache";
import {
  createClient,
  createIssue,
  getIssueLabels,
  getTeams,
  getViewer,
  getWorkflowStates,
} from "../routines";

export const newCommand = [
  "new",
  "Create a new issue.\n",
  {},
  async () => {
    const client = await createClient();
    const [viewer, teams, workflowStates, issueLabels] = await Promise.all([
      getViewer(client),
      getTeams(client),
      getWorkflowStates(client),
      getIssueLabels(client),
    ]);

    const {
      checkoutBranch,
      description,
      estimate,
      labelIds,
      stateId,
      teamId,
      title,
    } = await inquirer.prompt([
      {
        name: "teamId",
        message: "Team",
        type: "list",
        choices: () => {
          return teams.map((team) => ({
            name: `${team.name} (${team.key})`,
            value: team.id,
          }));
        },
        loop: false,
        default: cache.getKey("teamId"),
      },
      {
        name: "title",
        message: "Title",
      },
      {
        name: "description",
        message: "Description",
      },
      {
        name: "labelIds",
        message: "Labels",
        type: "checkbox",
        choices: ({ teamId }) => {
          return issueLabels
            .filter((issueLabel) => issueLabel.team.id === teamId)
            .map((issueLabel) => ({
              name: issueLabel.name,
              value: issueLabel.id,
            }));
        },
        loop: false,
      },
      {
        name: "stateId",
        message: "Status",
        type: "list",
        choices: ({ teamId }) => {
          return workflowStates
            .filter((workflowState) => workflowState.team.id === teamId)
            .map((workflowState) => ({
              name: workflowState.name,
              value: workflowState.id,
            }));
        },
        loop: false,
        default: (answers: any) => {
          return cache.getKey(`team-${answers.teamId}:stateId`);
        },
      },
      {
        name: "estimate",
        message: "Estimate",
        type: "number",
      },
      {
        name: "checkoutBranch",
        message: "Checkout branch?",
        type: "confirm",
        default: true,
      },
    ]);

    cache.setKey("teamId", teamId);
    cache.setKey(`team-${teamId}:stateId`, stateId);
    cache.save(true);

    const issue = await createIssue(client, {
      assigneeId: viewer.id,
      description,
      estimate: estimate || undefined,
      labelIds,
      stateId,
      title,
      teamId,
    });

    if (checkoutBranch) {
      await $`git checkout -b ${issue.branchName}`;
    }

    console.log(
      chalk.greenBright(
        `Issue ${issue.identifier} has been created and can be viewed at: `
      ) + chalk.underline(issue.url)
    );
  },
] as const;
