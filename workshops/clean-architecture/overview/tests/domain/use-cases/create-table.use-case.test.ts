import {
  CreateTable,
  ICreateTableOptions,
} from "../../../src/domain/use-cases/create-table.use-case";

describe("Use case: Create table", () => {
  it("should be defined", () => {
    expect(CreateTable).toBeDefined();
  });

  const createTable = new CreateTable();

  it("should create an instance of 'CreateTable'", () => {
    expect(createTable).toBeInstanceOf(CreateTable);
  });

  it("should have the 'execute()' method", () => {
    expect(createTable).toEqual({
      execute: expect.any(Function),
    });
  });
});

describe("Use case: Create Table, Method: 'execute()'", () => {
  const { execute } = new CreateTable();

  const options: ICreateTableOptions = { base: 1, limit: 3 };

  const table = execute(options);

  it("should return a string", () => {
    expect(typeof table).toBe("string");
  });

  it("should contain multiplications from 1 to the limit (included)", () => {
    const { base, limit } = options;

    expect(table).toContain(`${base} x 1 = ${base}`);
    expect(table).toContain(`${base} x ${limit} = ${base * limit}`);
  });
});
