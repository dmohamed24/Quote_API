## CI/CD Pipeline for Quote API

This repository contains a CI/CD pipeline for a Node.js-based Quote API using GitHub Actions and Render for deployment. The workflow includes automated testing, linting, and deployment to staging and production environments.

### Features

- Automated Testing: Runs unit tests on each pull request and push to the `main` branch.

- Linting: Ensures code quality by running a linter before deployment.

- Deploy Preview: Deploys a preview of pull requests to Render.

- Continuous Deployment: Automatically deploys the main branch to the staging environment.

- Manual Deployment: Allows manual deployment to production using GitHub Actions.

### Workflow Overview

The CI/CD pipeline is structured using three GitHub Actions workflows:

#### 1. Continuous Integration Workflow

- Triggered on pull requests to the main branch.

- Runs unit tests and linter checks.

- Deploys a preview of the PR to Render.

#### 2. Continuous Deployment to Staging

- Triggered on push to main.

- Runs unit tests and linter checks.

- Deploys the latest changes to the staging environment on Render.

#### 3. Manual Deployment to Production

- Triggered manually via GitHub Actions (workflow_dispatch).

- Runs unit tests and linter checks.

- Deploys the approved version to the production environment.

### Render Deployment Process

We use Render to host both the staging/testing environment and the live production environment. The deployment process involves the following steps:

1. Create Two Render Instances:

   - One for staging and PR previews (testing environment).

   - One for live production.

2. Configure GitHub Actions:

   - The deploy hook URL for each environment is stored in GitHub secrets.

   - The staging instance is deployed dynamically via GitHub Actions when a PR is created or updated.

   - The production instance is deployed manually via GitHub Actions when approved.

3. Disable Auto Deployment in Render:

   - In the Render settings for both instances, turn off the Auto Deployment feature.

   - This ensures that deployments only occur when triggered via GitHub Actions.

### Setup Instructions

#### 1. Clone the Repository

```
git clone <repository-url>
cd <repository-name>
```

#### 2. Install Dependencies

```
npm install
```

#### 3. Running Tests Locally

```
npm run test
```

#### 4. Running Linter Locally

```
npx standard -v
```

#### 5. Setting Up Secrets in GitHub

You need to set up the following secrets in your GitHub repository:

- `RENDER_DEPLOY_HOOK_STAGING` – The deploy hook URL for the staging environment.

- `RENDER_DEPLOY_HOOK` – The deploy hook URL for the production environment.

#### 6. Deploying to Production

To manually deploy to production, go to the GitHub Actions tab, select Manual Deployment Workflow, and trigger the workflow.

### License

This project is licensed under the MIT License.
