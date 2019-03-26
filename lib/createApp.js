"use strict";

const path = require("path");
const os = require("os");
const { spawn, execSync } = require("child_process");
const fs = require("fs-extra");
const chalk = require("chalk");
const { checkAppName } = require("./validators");

module.exports = function createApp(name, verbose) {
  const root = path.resolve(name);
  const appName = path.basename(root);

  checkAppName(name);

  // TODO: if folder already exists, stop here for now. should use some validation instead in order to use existing folder.
  if (fs.existsSync(name)) {
    console.log("Path already exists. Select another one or remove existing.");
    process.exit(1);
  } else {
    console.log(`Creating a new app in ${chalk.green(root)}.`);
    fs.ensureDirSync(name);
  }

  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(
      {
        name: appName,
        version: "0.1.0",
        private: true
      },
      null,
      2
    ) + os.EOL
  );

  const originalDirectory = process.cwd();
  process.chdir(root);

  return run(root, appName, verbose, originalDirectory);
};

function run(root, appName, verbose, originalDirectory) {
  console.log("Installing packages. This might take a couple of minutes.");

  // TODO: Define dependencies and install them. This needs be read in
  // conjunction with lerna to keep it all in one place.
  return install(verbose);
}

function install(dependencies, verbose) {
  return new Promise((resolve, reject) => {
    const command = "npm";
    const args = [
      "install",
      "--save",
      "--save-exact",
      "--loglevel",
      "error"
    ].concat(dependencies);

    if (verbose) {
      args.push("--verbose");
    }

    const child = spawn(command, args, { stdio: "inherit" });
    child.on("close", code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(" ")}`
        });
        return;
      }
      resolve();
    });
  });
}
