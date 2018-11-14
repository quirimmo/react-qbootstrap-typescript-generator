jest.mock("fs", () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  unlinkSync: jest.fn()
}));
const fs = require("fs");
const mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
const folderManager = require("./folder-manager");
const folderName = "new-folder";
const numberOfFilesToDelete = 1;

describe("folder-manager", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
  });

  it("should be defined", () => {
    expect(folderManager).toBeDefined();
  });

  it("should define the exposed methods", () => {
    expect(typeof folderManager.createProjectFolder).toEqual("function");
    expect(typeof folderManager.deleteProjectFiles).toEqual("function");
  });

  describe("createProjectFolder", () => {
    it("should throw an error if you do not provide the folder name", () => {
      expect(folderManager.createProjectFolder).toThrowError(
        "Please provide the name of the folder"
      );
    });

    it("should call the fs.existsSync method", () => {
      fs.existsSync.mockReturnValueOnce(false);
      folderManager.createProjectFolder(folderName);
      expect(fs.existsSync).toHaveBeenCalledWith(folderName);
    });

    it("should throw an error if the folder already exists", () => {
      fs.existsSync.mockReturnValueOnce(true);
      expect(
        folderManager.createProjectFolder.bind(folderManager, folderName)
      ).toThrowError("The specified folder new-folder already exists");
    });

    it("should throw an error if the folder was not created", () => {
      fs.existsSync.mockReturnValueOnce(false);
      fs.mkdirSync.mockImplementation(() => {
        throw new Error("custom-error");
      });
      expect(
        folderManager.createProjectFolder.bind(folderManager, folderName)
      ).toThrowError(
        "Error creating the specified folder new-folder: Error: custom-error"
      );
    });

    it("should call the fs.mkdirSync method", () => {
      fs.existsSync.mockReturnValueOnce(false);
      fs.mkdirSync.mockReturnValueOnce(true);
      folderManager.createProjectFolder(folderName);
      expect(fs.mkdirSync).toHaveBeenCalledWith(folderName);
    });

    it("should log a success message when the folder is created successfully", () => {
      fs.existsSync.mockReturnValueOnce(false);
      fs.mkdirSync.mockReturnValueOnce(true);
      folderManager.createProjectFolder(folderName);
      expect(mockConsoleLog).toHaveBeenCalledWith(
        "Folder new-folder created successfully"
      );
    });
  });

  describe("deleteProjectFiles", () => {
    it("should call the fs.existsSync for each file to delete", () => {
      fs.existsSync.mockReturnValue(false);
      folderManager.deleteProjectFiles(folderName);
      expect(fs.existsSync).toHaveBeenCalledTimes(numberOfFilesToDelete);
      expect(fs.existsSync).toHaveBeenNthCalledWith(
        1,
        `${folderName}/README.md`
      );
    });

    it("should call the fs.unlinkSync for each file to delete", () => {
      fs.existsSync.mockReturnValue(true);
      folderManager.deleteProjectFiles(folderName);
      expect(fs.existsSync).toHaveBeenCalledTimes(numberOfFilesToDelete);
      expect(fs.unlinkSync).toHaveBeenNthCalledWith(
        1,
        `${folderName}/README.md`
      );
    });

    it("should log a message every time a file is deleted", () => {
      fs.existsSync.mockReturnValue(true);
      folderManager.deleteProjectFiles(folderName);
      expect(fs.existsSync).toHaveBeenCalledTimes(numberOfFilesToDelete);
      expect(mockConsoleLog).toHaveBeenNthCalledWith(
        1,
        "Deleted file",
        `${folderName}/README.md`
      );
    });
  });
});
