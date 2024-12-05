import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

export interface RunOptions {
  base: number;
  fileDestination: string;
  fileName: string;
  limit: number;
  showTable: boolean;
}

export class ServerApp {
  static run({
    base,
    fileDestination,
    fileName,
    limit,
    showTable,
  }: RunOptions) {
    console.log("Server running...");

    const table = new CreateTable().execute({ base, limit });

    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileName,
      fileDestination,
    });

    if (showTable) console.log(table);

    if (wasCreated) console.log("File created!");
    else console.error("File not created");

    console.log("Server stopped.");
  }
}
