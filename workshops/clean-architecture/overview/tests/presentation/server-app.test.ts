import { CreateTable } from "../../src/domain/use-cases/create-table.use-case";
import { SaveFile } from "../../src/domain/use-cases/save-file.use-case";
import { RunOptions, ServerApp } from "../../src/presentation/server-app";

describe("Presentation: Server App", () => {
  it("should be defined", () => {
    expect(ServerApp).toBeDefined();
  });

  const serverApp = new ServerApp();

  it("should create an instance of 'ServerApp'", () => {
    expect(serverApp).toBeInstanceOf(ServerApp);
  });

  it("should should have the 'run()' static method", () => {
    expect(typeof ServerApp.run).toBe("function");
  });
});

describe("Presentation: Server App - Integration Tests", () => {
  const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");

  const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

  const consoleLogSpy = jest
    .spyOn(console, "log")
    .mockImplementation(jest.fn());

  const runOptions: RunOptions = {
    base: 5,
    limit: 5,
    showTable: true,
    fileName: "server-app-test.txt",
    fileDestination: "server-app-integration-test",
  };

  afterAll(jest.resetAllMocks);

  it("should run 'run()' with options", () => {
    ServerApp.run(runOptions);

    const { base, fileDestination, fileName, limit, showTable } = runOptions;

    expect(consoleLogSpy).toHaveBeenCalledTimes(showTable ? 4 : 3);
    expect(consoleLogSpy).toHaveBeenCalledWith("Server running...");
    expect(consoleLogSpy).toHaveBeenCalledWith("File created!");
    expect(consoleLogSpy).toHaveBeenLastCalledWith("Server stopped.");

    expect(createTableSpy).toHaveBeenCalledTimes(1);
    expect(createTableSpy).toHaveBeenCalledWith({
      base,
      limit,
    });

    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      fileDestination,
      fileName,
    });
  });
});
