const fs = require("fs");

function createProjectFolder(folderName) {
  if (!folderName) {
    throw new Error("Please provide the name of the folder");
  }
  if (fs.existsSync(folderName)) {
    throw new Error(`The specified folder ${folderName} already exists`);
  }
  try {
    fs.mkdirSync(folderName);
    console.log(`Folder ${folderName} created successfully`);
  } catch (error) {
    throw new Error(
      `Error creating the specified folder ${folderName}: ${error}`
    );
  }
}

function deleteProjectFiles(folderName) {
  const filesToDelete = ["README.md"];
  filesToDelete.forEach(onEachFile);

  function onEachFile(file) {
    const path = `${folderName}/${file}`;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("Deleted file", path);
    }
  }
}

function refreshPackageJSON(folderName) {
  const packagePath = `${folderName}/package.json`;
  const packageJSONContent = JSON.parse(fs.readFileSync(packagePath));
  packageJSONContent.bugs = {};
  packageJSONContent.repository = {};
  packageJSONContent.homepage = "";
  packageJSONContent.author = "";
  packageJSONContent.description = "";
  packageJSONContent.name = "project-name";
  fs.writeFileSync(packagePath, JSON.stringify(packageJSONContent, null, "\t"));
  // fs.writeFileSync(packagePath, JSON.stringify(packageJSONContent, null, "\t"));
  console.log("File package.json written successfully");
}

exports.createProjectFolder = createProjectFolder;
exports.deleteProjectFiles = deleteProjectFiles;
exports.refreshPackageJSON = refreshPackageJSON;
