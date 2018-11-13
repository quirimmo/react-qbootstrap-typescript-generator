jest.mock("fs", () => ({
  existsSync: jest.fn(),
  mkdirSync: jest.fn()
}));
const fs = require("fs");
const folderManager = require("./folder-manager");
const folderName = "new-folder";

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
      const spy = jest.spyOn(console, "log");
      fs.existsSync.mockReturnValueOnce(false);
      fs.mkdirSync.mockReturnValueOnce(true);
      folderManager.createProjectFolder(folderName);
      expect(spy).toHaveBeenCalledWith(
        "Folder new-folder created successfully"
      );
    });
  });
});