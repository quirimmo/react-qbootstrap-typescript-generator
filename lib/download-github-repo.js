const downloadGithubRepo = require("download-github-repo");

const repo = "quirimmo/react-qbootstrap";

function downloadCode(destination) {
  return new Promise((resolve, reject) => {
    downloadGithubRepo(repo, destination, () => {
      console.log("Downloaded repo from github");
      resolve();
    });
  });
}

module.exports = downloadCode;
