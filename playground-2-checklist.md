# Playground 2 Checklist

## Integration npm and build management tool

_present core functionalities of your build management tool and how you did the setup_

1. From existing project: `npm init -y` (uses defaults, bypasses questions)
2. Creation of `package.json`, manifest file that contains definition of all dependencies and versions as well as metadata about the project
3. Installation of vite as a dev dependency: `npm install --save-dev vite`
4. Entry point in index.html: `<script src="./src/main.js" type="module"></script>`
5. Update scripts to use vite:

```
"dev": "vite",
"build": "vite build",
```

Vite core functionalities:

- Fast dev server start using ES modules (`import`/`export`)
- Hot Module Replacement
- Built-in support for TypeScript
- Optimized bundling and minification of JS, CSS, and static assets in `/dist` folder for productions builds

## TypeScript configuration

_what is necessary? where are config files? differences TS and JS_

1. Install TypeScript: `npm install --save-dev typescript`
2. Add `tsconfig.json` (can use `npx tsc --init`)
3. Update file extensions from `.js` to `.ts`

Main differences:

- Types checked at compile time instead of runtime
- Includes type annotations for declaring types on variables, functions, parameters, and return types
- Uses interfaces and types for defining object structures

## ESLint and Prettier

_what is it? how to use it? how to integrate rulesets?_

- **ESLint is a linter**: looks for bugs and code-quality issues in JS/TS code
- **Prettier is a code formatter**: enforces consistent style with things like indentation, quotes, semicolons, and line wrapping

Both help in maintaining cleaner code. To use:

1. Install packages
2. Configure settings (including rulesets for integrating)
3. Include in npm scripts

## Clear build workflows

_what did you consider to fulfill this requirement? how does npm handle different dependencies?_

Keeping dev-related packages separate from packages required for production: `devDependencies` vs `dependencies` in `package.json`

This project does not yet require any packages to run in production, only dev depedencies have been installed (e.g. typescript, eslint, prettier)

## Definition of tasks in npm scripts

_show how it works. show your task outcomes and explain_

```
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint 'src/**/*.{js,ts}'",
    "lint:fix": "eslint 'src/**/*.{js,ts}' --fix",
    "format": "prettier --write 'src/**/*.{js,ts}'",
    "format:check": "prettier --check 'src/**/*.{js,ts}'",
    "prepare": "husky"
  },
```

## Pre-commit hooks

_how does it work? why do we want this?_

When a commit is made to git, the hook is triggered to run before actually being committed. Whatever is included in the script will run -- in this case, running `lint-staged`:

```
"lint-staged": {
    "src/**/*.{ts,js}": [
      "eslint --fix",
      "prettier --write"
    ]
  },
```

Running a linter or formatter before committing code helps to detect and fix errors or issues early and enforce code quality more cosistently.

## Configuration of workflows and GitHub Actions setup

_explain steps of each wf. show setup files. show a wf run. reuse of workflows?_
