const downloadCode = require("./download-github-repo");
const folderManager = require("./folder-manager");
const shellManager = require("./shell-manager");

function generate() {
  const projectName = shellManager.getProjectNameArgument();
  folderManager.createProjectFolder(projectName);
  downloadCode(projectName).then(onDowloadCode);

  function onDowloadCode() {
    folderManager.deleteProjectFiles(projectName);
    folderManager.refreshPackageJSON(projectName);
  }
}

exports.generate = generate;
