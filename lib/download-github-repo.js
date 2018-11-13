const downloadGithubRepo = require("download-github-repo");

const repo = "quirimmo/react-qbootstrap";
const destination = "./lib/download";

function downloadCode() {
  return new Promise((resolve, reject) => {
    downloadGithubRepo(repo, destination, () => {
      console.log("Downloaded repo from github");
      resolve();
    });
  });
}

module.exports = downloadCode;
