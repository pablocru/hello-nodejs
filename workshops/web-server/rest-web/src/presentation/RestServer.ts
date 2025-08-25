export interface IRestServer {
  start(port: number): void;
  stop(): void;
}

export enum FileExtension {
  HTML = "html",
  CSS = "css",
  JS = "js",
  TEXT = "text",
  ICON = "icon",
}

export type ContentTypeMap = Record<FileExtension, string>;

export type ContentType = Record<"Content-Type", string>;

export abstract class RestServer implements IRestServer {
  protected readonly htmlContentType = this.getContentType(FileExtension.HTML);
  protected readonly cssContentType = this.getContentType(FileExtension.CSS);
  protected readonly jsContentType = this.getContentType(FileExtension.JS);
  protected readonly textContentType = this.getContentType(FileExtension.TEXT);
  protected readonly iconContentType = this.getContentType(FileExtension.ICON);

  abstract start(port: number): void;
  abstract stop(): void;

  protected getContentType(fileExtension: FileExtension) {
    const contentTypeMap: ContentTypeMap = {
      [FileExtension.HTML]: "text/html",
      [FileExtension.CSS]: "text/css",
      [FileExtension.JS]: "application/javascript",
      [FileExtension.TEXT]: "text/plain",
      [FileExtension.ICON]: "image/x-icon",
    };

    return { "Content-Type": contentTypeMap[fileExtension] };
  }

  protected getContentTypeHeader(url?: string) {
    const contentType = url?.endsWith(".css")
      ? this.cssContentType
      : url?.endsWith(".js")
      ? this.jsContentType
      : url?.endsWith(".ico")
      ? this.iconContentType
      : this.textContentType;

    return contentType;
  }
}
