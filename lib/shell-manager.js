const argv = require("yargs").argv;

function getProjectNameArgument() {
  const projectName = argv.name;
  if (!projectName) {
    throw new Error(
      "You must provide a valid project name through the command option: --name PROJECT_NAME_HERE"
    );
  }
  return projectName;
}

exports.getProjectNameArgument = getProjectNameArgument;
