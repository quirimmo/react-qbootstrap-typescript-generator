// USAGE OF CODE DOWNLOADER FROM GITHUB
// const downloadCode = require("./download-github-repo");
// downloadCode();

// USAGE OF FOLDER MANAGER
// const folderManager = require("./folder-manager");
// folderManager.createProjectFolder('bla-bla-bla');
// folderManager.deleteProjectFiles("./lib/download");

// USAGE OF SHELL MANAGER
const shellManager = require("./shell-manager");
const projectName = shellManager.getProjectNameArgument();
console.log("The provided project name is:", projectName);
