const mockApi = jest.fn(() => {});
jest.mock("download-github-repo", () => mockApi);
const downloadCode = require("./download-github-repo");

describe("download github repo", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(downloadCode).toBeDefined();
  });

  it("should be a function", () => {
    expect(typeof downloadCode).toEqual("function");
  });

  it("should call the download-github-repo api", () => {
    downloadCode();
    expect(mockApi).toHaveBeenCalledWith(
      "quirimmo/react-qbootstrap",
      "./lib/download",
      expect.any(Function)
    );
  });
});
