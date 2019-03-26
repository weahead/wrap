"use strict";

const validatePackageName = require("validate-npm-package-name");

module.exports = {
  checkAppName
};

function checkAppName(name) {
  const { validForNewPackages, errors, warnings } = validatePackageName(name);
  if (!validForNewPackages) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${appName}"`
      )} because of npm naming restrictions:`
    );
    printValidationResults(errors);
    printValidationResults(warnings);
    process.exit(1);
  }
}
