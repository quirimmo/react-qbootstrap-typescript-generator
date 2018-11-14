const mockProjectName = "project-name";
jest.mock("yargs", () => ({
  argv: { name: mockProjectName }
}));
const shellManager = require("./shell-manager");
const argv = require("yargs").argv;

describe("shell-manager", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.runOnlyPendingTimers();
  });

  it("should be defined", () => {
    expect(shellManager).toBeDefined();
  });

  it("should define the exposed methods", () => {
    expect(typeof shellManager.getProjectNameArgument).toEqual("function");
  });

  describe("getProjectNameArgument", () => {
    it("should throw an error if you did not provide a project name", () => {
      argv.name = null;
      expect(shellManager.getProjectNameArgument).toThrowError(
        "You must provide a valid project name through the command option: --name PROJECT_NAME_HERE"
      );
    });

    it("should return the project name if you provided a project name", () => {
      argv.name = mockProjectName;
      expect(shellManager.getProjectNameArgument()).toEqual(mockProjectName);
    });
  });
});
