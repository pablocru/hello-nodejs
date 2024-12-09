import fs, { existsSync, readFileSync, rmSync } from "node:fs";
import {
  ISaveFileOptions,
  SaveFile,
} from "../../../src/domain/use-cases/save-file.use-case";

const OUTPUT_DIRECTORY = "output";

function cleanUp() {
  if (existsSync(OUTPUT_DIRECTORY))
    rmSync(OUTPUT_DIRECTORY, { recursive: true });
}

describe("Use case: Save File", () => {
  it("should be defined", () => {
    expect(SaveFile).toBeDefined();
  });

  const saveFile = new SaveFile();

  it("should create an instance of 'SaveFile'", () => {
    expect(saveFile).toBeInstanceOf(SaveFile);
  });

  it("should have the 'execute()' method", () => {
    expect(saveFile).toEqual({
      execute: expect.any(Function),
    });
  });
});

describe("Use case: Create Table, Method: 'execute()'", () => {
  const { execute } = new SaveFile();

  const options: ISaveFileOptions = {
    fileContent: "Test content",
  };

  beforeEach(cleanUp);

  afterAll(cleanUp);

  it("should return a boolean", () => {
    expect(typeof execute(options)).toBe("boolean");
  });

  // `console.error()` mock creation
  const consoleErrorMock = jest
    .spyOn(console, "error")
    .mockImplementation(jest.fn());

  it("should return `false` if directory could not be created", () => {
    jest.spyOn(fs, "mkdirSync").mockImplementationOnce(() => {
      throw new Error("Testing error");
    });

    const result = execute(options);

    expect(result).toBe(false);
  });

  it("should return `false` if file could not be created", () => {
    jest.spyOn(fs, "writeFileSync").mockImplementationOnce(() => {
      throw new Error("Testing error");
    });

    const result = execute(options);

    expect(result).toBe(false);
  });

  // `console.error()` mock clean up
  consoleErrorMock.mockClear();

  it("should save file with default values", () => {
    expect(execute(options)).toBeTruthy();

    const filePath = `${OUTPUT_DIRECTORY}/table.txt`;

    saveFileTester(filePath, "utf8", options.fileContent);
  });

  it("should save file with custom values", () => {
    const options: ISaveFileOptions = {
      fileContent: "Custom content",
      fileDestination: "custom-folder",
      fileEncoding: "ascii",
      fileName: "custom-file.txt",
    };

    expect(execute(options)).toBeTruthy();

    const filePath = `${OUTPUT_DIRECTORY}/${options.fileDestination}/${options.fileName}`;

    saveFileTester(filePath, options.fileEncoding!, options.fileContent);
  });
});

function saveFileTester(
  filePath: string,
  fileEncoding: BufferEncoding,
  fileContent: string
) {
  const fileExists = existsSync(filePath);
  expect(fileExists).toBeTruthy();

  const savedFileContent = readFileSync(filePath, {
    encoding: fileEncoding,
  });
  expect(savedFileContent).toBe(fileContent);
}
