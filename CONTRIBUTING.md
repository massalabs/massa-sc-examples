# Contributing to massa-sc-examples
Thank you for considering contributing to massa-sc-examples!

## Reporting Bugs
If you discover a bug, please create a [new issue](https://github.com/massalabs/massa-sc-examples/issues/new?assignees=&labels=issue%3Abug&template=bug.md&title=) on our GitHub repository.
In your issue, please include a clear and concise description of the bug, any relevant code snippets, error messages, and steps to reproduce the issue.

## Contributing Code
We welcome contributions in the form of bug fixes, enhancements, and new features.

To contribute code, please follow these steps:

1. Fork the massa-sc-examples repository to your own account.
2. Create a new branch from the `main` branch for your changes.
3. Make your changes and commit them to your branch.
4. Push your branch to your fork.
5. Create a pull request from your branch to the develop branch of the massa-sc-examples repository.

> **NOTE:** When creating a pull request, please include a clear and concise title and description of your changes, as well as any relevant context or background information.

## Code Style
Please ensure that your code follows the existing code style used in the project.
We use the [MassaLabs Prettier configuration](https://github.com/massalabs/prettier-config-as) and [MassaLabs ESLint configuration](https://github.com/massalabs/eslint-config) for formatting and linting.

You can run the following command to format your code before committing:

```sh
npm run fmt
```

## Tests
Please ensure that your changes include any necessary tests in the CI.
We use [as-pect library](https://as-pect.gitbook.io/as-pect/) for unit testing.

You can run the following command to run the tests:

```sh
npm run test
```

## License
By contributing to massa-sc-examples, you agree that your contributions will be licensed under the MIT License.
