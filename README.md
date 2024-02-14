# PatientFlowHQ : Collaboration Guide

## Introduction
Welcome to PatientFlowHQ repo! This guide is intended to help collaborators work effectively on this project. Please follow these guidelines to maintain consistency and quality in our codebase.

## Getting Started

### Setting Up Your Local Environment
Before you begin, make sure you have the latest version of Node.js and npm installed.

1. **Clone the Repository**: 

git clone https://github.com/medola-dev/cenna.git

2. **Install Dependencies**:
npm install

3. **Local Environment Variables**: 
- Update your `.env.local` file with the content provided by the project admin.
- **Never** commit your `.env.local` file to the repository.

### Running the Application Locally
To run the application on your local machine:
npm run dev

This will start the development server. Visit `http://localhost:3000` to view the application.

## Workflow Guidelines

### Working with Git
1. **Update Production Branch**:

git checkout prod
git pull

2. **Create a Topical Branch from `prod`**:

git checkout -b [your-branch-name]

3. **Work on Your Branch**:
- Make your changes locally.
- Test your changes thoroughly.

### Code Standards
- Ensure code follows established coding standards and best practices.
- Write meaningful commit messages.
- Include comments in your code where necessary.

### Pull Requests (PRs)
1. **Creating a PR**:
- Push your branch to the repository.
- Create a Pull Request against the `prod` branch.
- Describe your changes in detail.
2. **Code Review**:
- Request a code review from a team member.
- Address any feedback received.

### Merging Changes
- Only merge PRs after approval.
- PRs will be merged into `prod` by a project admin.
- Your changes will be deployed after merging into `prod`.

## Testing
- Write tests for new features and bug fixes.
- Run existing tests before making a pull request:

npm run test (Tests will be added soon)


## Communication
- Use GitHub issues for tracking bugs and feature requests.

## Additional Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Node.js](https://nodejs.org/en/)

---

Remember, this is a collaborative effort. Respect and constructive feedback are key to a successful team. Happy coding! 🚀
