# Linear CLI

This is an unofficial CLI for [Linear](https://linear.app).

### Commands

#### `linear login`

Authenticates the user using their personal API key. A new API key can be generated [here](https://linear.app/contra/settings/api). The API key is saved to the system keychain.

#### `linear logout`

Removes the API key from the keychain.

#### `linear new`

Creates a new issue. The following properties can be provided:

- Team (select from list populated based on your organization's settings)
- Title
- Description
- Labels (select from team-specific list based on your organization's settings)
- Status (select from team-specific list based on your organization's settings)
- Estimate (optional)
- Checkout branch (if true, will create and checkout a new git branch using the generated branch name)

#### `linear checkout`

Create and checkout a new branch for a specific issue. Allows you to search for a specific issue by identifier or keywords.

#### `linear status`

Updates the status of an existing issue. The current git branch name is parsed to determine the issue to update; if the issue cannot be identified that way, you'll be prompted to search for the issue instead. The status is selected from a list specific to the team the issue belongs to.

#### `linear clear`

This tool leverages Linear's API to query data that is specific to your organization's settings, like its teams, labels and statuses. In order to provide a better developer experience, this data is cached locally. If any of these settings change in Linear, it's necessary to clear the cache so that fresh data can be fetched. This command clears that cache.

Note: You can run `linear --help` to see where the cache directory is located on your machine.
