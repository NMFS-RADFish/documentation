---
sidebar_position: 1
---

# Getting Started

Create RADFish App is the officially supported tool for creating single-page React applications. It offers a modern build setup with no configuration.

## Prerequisites

Before you start, make sure you have the following installed:

- [x] Node.js (v20.17.0 or later)
- [x] npm (v10.8.2 or later)
- [x] git (v2.0 or later)

## Quick Start

### Option 1: Scaffold a new app from a template

Start your app with a barebones and pre-configured [template](./examples-and-templates#templates).

```bash
npx @nmfs-radfish/create-radfish-app my-app
cd my-app
npm start
```

Once the development server starts, visit http://localhost:3000/ in your browser to see your app.

### Option 2: Scaffold a new app from an example

Select an [example](/radfish/developer-documentation/examples-and-templates) and run  [the command](./building-your-application/available-scripts/running-example.md) using the `--example` tag. 

```bash
npx @nmfs-radfish/create-radfish-app my-app --example multistep-form
cd my-app
npm start
```

### Option 3: Clone the boilerplate repository to access all examples

To get all the examples, clone the [boilerplate repository](https://github.com/NMFS-RADFish/boilerplate):

```bash
git clone https://github.com/NMFS-RADFish/boilerplate.git
```

Then navigate to the example you want to run and start the app:

```bash
cd boilerplate/examples/[example you want to run]
npm install
npm start
```

Once the development server starts, visit http://localhost:3000/ in your browser to see your app.

### Using the help flag

The `--help` flag is a common option that displays helpful information about a command or script, including available options and usage instructions.

```bash
npx @nmfs-radfish/create-radfish-app --help
```

# Scripts

**`npm start`**

This script starts the Vite development server. It runs the app locally with hot module reloading, allowing for fast development and instant updates as you make changes.

**`npm run build`**

Builds the project for production by using Vite’s build tool. It generates optimized static assets, such as HTML, CSS, and JavaScript, which are output to the dist directory.

**`npm run prebuild`**

Before the build process starts, this script ensures that the dist folder (which contains the previous build) is deleted. This helps prevent old build files from being included in the new build.

**`npm test`**

Runs unit and integration tests using Vitest, while excluding end-to-end (e2e) tests located in the `./src/__tests__/e2e/` directory. It ensures that regular tests are executed separately from e2e tests.

**`npm test:e2e`**

Runs end-to-end (e2e) tests located in `./src/__tests__/e2e/integration.e2e.test.jsx`. This script uses concurrently to run the Vite server and e2e tests in parallel, automatically stopping other processes if one succeeds.

**`npm run lint`**

Runs ESLint with the `--fix` option, which automatically fixes certain linting issues in the code found in the src/ directory.

**`npm run format`**

Formats the code in the `src/` directory using Prettier according to the configuration specified in the `.prettierrc` file. This ensures consistent code formatting across the project.

**`npm run serve`**

This script starts a local server to preview the production build. It serves the files from the `dist/` folder, allowing you to check how the app will behave in a production environment.

**`npm run lhci:mobile`**

Runs **Lighthouse CI (LHCI)** on the application, collecting performance metrics and scores for mobile devices. It automates performance auditing to ensure the app meets mobile optimization standards.

**`npm run lhci:desktop`**

Runs **Lighthouse CI (LHCI)** on the application, collecting performance metrics and scores for desktop devices. This script is similar to lhci:mobile but targets desktop performance.

Now that you are up and running, see the [Components & Usage](./building-your-application/patterns/components.md) section to start building out your first pages!
