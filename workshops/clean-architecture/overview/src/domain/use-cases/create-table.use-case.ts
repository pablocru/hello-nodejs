export interface ICreateTableOptions {
  base: number;
  limit: number;
}

export interface ICreateTableUseCase {
  execute: (options: ICreateTableOptions) => string;
}

export class CreateTable implements ICreateTableUseCase {
  execute({ base, limit }: ICreateTableOptions) {
    const separator = `${Array(23).fill("=").join("")}\n`;

    let multiplicationOutput =
      separator + `     ${base} times table \n` + separator;

    for (let i = 1; i <= limit; i++) {
      multiplicationOutput += `\n${base} x ${i} = ${base * i}`;
    }
    multiplicationOutput += "\n";

    return multiplicationOutput;
  }
}
