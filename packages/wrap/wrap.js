"use strict";

const program = require("commander");
const chalk = require("chalk");

const createApp = require("./createApp");

const packageJSON = require("./package.json");

let projectName;

program
  .version(packageJSON.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action(name => {
    projectName = name;
  })
  .option("--verbose", "print additional logs")
  .parse(process.argv);

if (projectName === undefined) {
  console.error("Please specify the project directory:");
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`
  );
  console.log();
  console.log("For example:");
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green("my-wa-app")}`);
  process.exit(1);
}

createApp(projectName, program.verbose).then(() => {
  console.log("all done!");
});
