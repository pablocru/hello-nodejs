async function runCommand(args: string[]) {
  process.argv = [...process.argv, ...args];

  const argumentManager = await import(
    "../../src/plugins/argument-manager.plugin"
  );

  return argumentManager.default;
}

describe("Plugin: Argument Manager", () => {
  // Clear mocked argument values
  const originalArgv = process.argv;
  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it("should return default values", async () => {
    const argumentManager = await runCommand(["-b=5"]);

    expect(argumentManager).toEqual({
      base: 5,
      limit: 10,
      showTable: false,
      fileName: "table.txt",
      fileDestination: "",
    });
  });

  it("should return custom values", async () => {
    const base = 30,
      limit = 5,
      showTable = true,
      fileName = "test-file.txt",
      fileDestination = "testing-folder";

    const argumentManager = await runCommand([
      `-b=${base}`,
      `-l=${limit}`,
      showTable ? "-s" : "",
      `-n=${fileName}`,
      `-d=${fileDestination}`,
    ]);

    expect(argumentManager).toEqual({
      base,
      limit,
      showTable,
      fileDestination,
      fileName,
    });
  });
});
