# Electron Boiler

This project is the boilerplate for a simple Electron app, backed with a Node.js API with a React frontend.

## Getting Started and Prerequisites
Ensure that [NVM is installed](https://github.com/nvm-sh/nvm#installing-and-updating) and run:
```shell
npm init
npm install
```

## Overview
A lot of projects begin with the same boilerplate time and time again. This repository is a starting point, from which you can pick up a functioning Electron app with the following:

- React and Redux with component-scoped styles (see ["Extending the Frontend"](#extending-the-frontend))
- Node.js & Express.js API (see "[Extending the API](#extending-the-api)")
- ESLint (linting staged files on pre-commit hook)
- Prettier (auto formatting code on pre-commit hook)
- Jest & Enzyme

## Scripts

- **`npm init`:** Ensure that the correct Node version is being used and configure Git config to update the githook directory
- **`npm test`:** Use Jest to test any Javascript files that match [the default](https://jestjs.io/docs/en/configuration#testregex-string--arraystring). *Note: Files that match /test.[jt]sx?$/" will not be tested. The default has been overridden in jest.config.js to ensure that controllers/test.js does not fail*
- **`npm start`:** Bundle the React application with Parcel, start the API (accessible on localhost:3000) and display in an Electron window
- **`npm start:dev-tools`:** The same as `npm start`, but with dev tools open be default
- **`npm build`:** Use Parcel to bundle the React application

## Extending the Frontend

Each component lives in it's own directory inside `src/components` and comprises of three files:
1. **`<component-name>.jsx`:** The file for any React.js code
2. **`<component-name>.scss`:** The file for component specific styling. Any SCSS defined here, will be compiled and scoped to this component only and can be referenced in the `<component-name>.jsx` file using the `styles` import
3. **`<component-name>.spec.jsx`:** The file to define tests relating to the component. These will be executed when `npm test` is run

The files for a new component can be generated with `npm run createComponent`. A string such as "product tile", will create a `src/components/ProductTile directory`, for example.

Global styles (currently only resets and fonts) are pulled directly from [`src/styles/global.scss`](/src/styles/global/scss).

## Extending the API
When the Electron runtime starts, routes are exposed under the `/api` slug. Routes are currently defined in single files under `src/api/routes` and may have the following properties:

  - **`path`:** The path key as defined in `paths.js`
  - **`allowedHttpMethods`:** The HTTP verbs that will be supported by this route, as per [Express.js documentation](https://expressjs.com/en/5x/api.html#routing-methods)
  - **`handler`:** The method to call when this route is hit. Each handler/controller is defined in `src/api/controllers` and when called, is currently only passed two arguments - [`req`](https://expressjs.com/en/5x/api.html#req) and `callback`. Failures and successes are returned to the client as JSON, though errors have a `500` status code and a single `error` property
  - **`requiredParams`:** *Not yet implemented*

To extend the API and add additional endpoints, you will need to create a new route file with the correct keys and a corresponding controller for any functionality. Although the API is used within the app it is [still accessible](http://localhost:3000)
