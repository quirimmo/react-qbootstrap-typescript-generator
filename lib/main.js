const downloadGithubRepo = require("download-github-repo");

downloadGithubRepo('quirimmo/react-qbootstrap', './lib/download', data => {
	console.log('finished', data);
});

