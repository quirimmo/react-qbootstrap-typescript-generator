const downloadCode = require("./download-github-repo");
const folderManager = require("./folder-manager");

function generate() {
  // downloadCode();
  folderManager.refreshPackageJSON("./download");
}

exports.generate = generate;
