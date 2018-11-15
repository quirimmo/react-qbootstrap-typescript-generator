const mockProjectName = "project-name";
const mockGetProjectNameArgument = jest.fn().mockReturnValue(mockProjectName);
jest.mock("./shell-manager", () => ({
  getProjectNameArgument: mockGetProjectNameArgument
}));
const mockCreateProjectFolder = jest.fn();
const mockDeleteProjectFiles = jest.fn();
const mockRefreshPackageJSON = jest.fn();
jest.mock("./folder-manager", () => ({
  createProjectFolder: mockCreateProjectFolder,
  deleteProjectFiles: mockDeleteProjectFiles,
  refreshPackageJSON: mockRefreshPackageJSON
}));
const mockDownloadCode = jest.fn().mockReturnValue(Promise.resolve());
jest.mock("./download-github-repo", () => mockDownloadCode);
const index = require("./index");

describe("index", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(index).toBeDefined();
  });

  it("should define the exposed methods", () => {
    expect(typeof index.generate).toEqual("function");
  });

  describe("generate", () => {
    it("should call the getProjectNameArgument method of shell manager", () => {
      index.generate();
      expect(mockGetProjectNameArgument).toHaveBeenCalled();
    });

    it("should call the downloadCode method", () => {
      index.generate();
      expect(mockDownloadCode).toHaveBeenCalledWith(mockProjectName);
    });

    it("should call the deleteProjectFiles method of folder manager", async () => {
      await index.generate();
      expect(mockDeleteProjectFiles).toHaveBeenCalledWith(mockProjectName);
    });

    it("should call the refreshPackageJSON method of folder manager", async () => {
      await index.generate();
      expect(mockRefreshPackageJSON).toHaveBeenCalledWith(mockProjectName);
    });
  });
});
