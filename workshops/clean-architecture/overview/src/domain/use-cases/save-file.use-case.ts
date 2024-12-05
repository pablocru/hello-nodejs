import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export interface ISaveFileOptions {
  fileContent: string;
  fileName?: string;
  fileDestination?: string;
  fileEncoding?: BufferEncoding;
}

export interface ISaveFileUseCase {
  execute: (options: ISaveFileOptions) => boolean;
}

export class SaveFile implements ISaveFileUseCase {
  execute({
    fileContent,
    fileName = "table.txt",
    fileDestination = "",
    fileEncoding = "utf8",
  }: ISaveFileOptions) {
    try {
      fileDestination = resolve("output", fileDestination);

      mkdirSync(fileDestination, { recursive: true });

      writeFileSync(resolve(fileDestination, fileName), fileContent, {
        encoding: fileEncoding,
      });

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }
}
