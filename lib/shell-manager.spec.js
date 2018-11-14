const shellManager = require("./shell-manager");

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
    it("should throw an error if you did not provide a project name", () => {});
    it("should return the project name if you provided a project name", () => {});
  });
});
