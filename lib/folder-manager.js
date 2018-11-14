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
  const filesToDelete = [".gitignore", "README.md"];
  filesToDelete.forEach(onEachFile);

  function onEachFile(file) {
    const path = `${folderName}/${file}`;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
      console.log("Deleted file", path);
    }
  }
}

exports.createProjectFolder = createProjectFolder;
exports.deleteProjectFiles = deleteProjectFiles;
