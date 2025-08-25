import fs from "fs";
import http2, { Http2SecureServer } from "http2";
import { RestServer } from "./RestServer";

type HTTPResponse = http2.Http2ServerResponse<http2.Http2ServerRequest>;

enum FileExtension {
  HTML = "html",
  CSS = "css",
  JS = "js",
  TEXT = "text",
  ICON = "icon",
}

type ContentTypeMap = Record<FileExtension, string>;

type ContentType = Record<"Content-Type", string>;

export class HTTP2Server implements RestServer {
  private server: Http2SecureServer | null = null;
  private htmlContentType = this.getContentType(FileExtension.HTML);
  private cssContentType = this.getContentType(FileExtension.CSS);
  private jsContentType = this.getContentType(FileExtension.JS);
  private textContentType = this.getContentType(FileExtension.TEXT);
  private iconContentType = this.getContentType(FileExtension.ICON);

  constructor() {
    this.server = http2.createSecureServer(
      {
        key: fs.readFileSync("./certificates/server.key"),
        cert: fs.readFileSync("./certificates/server.crt"),
      },
      (request, response) => {
        console.log(request.url);

        if (request.url === "/") {
          this.staticFileResponse(
            "./public/index.html",
            this.htmlContentType,
            response
          );
          return;
        }

        const contentType = request.url?.endsWith(".css")
          ? this.cssContentType
          : request.url?.endsWith(".js")
          ? this.jsContentType
          : request.url?.endsWith(".ico")
          ? this.iconContentType
          : this.textContentType;

        this.staticFileResponse(
          `./public${request.url}`,
          contentType,
          response
        );
      }
    );
  }

  start(port: number): void {
    this.server?.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  stop(): void {
    this.server?.close();
  }

  private staticFileResponse(
    staticFile: string,
    contentType: ContentType,
    response: HTTPResponse
  ) {
    fs.readFile(staticFile, (err, readFile) => {
      if (err) {
        response
          .writeHead(500, this.htmlContentType)
          .end("<h1>Internal Server Error</h1>");
        return;
      }
      response.writeHead(200, contentType).end(readFile);
    });
  }

  private getContentType(fileExtension: FileExtension) {
    const contentTypeMap: ContentTypeMap = {
      [FileExtension.HTML]: "text/html",
      [FileExtension.CSS]: "text/css",
      [FileExtension.JS]: "application/javascript",
      [FileExtension.TEXT]: "text/plain",
      [FileExtension.ICON]: "image/x-icon",
    };

    return { "Content-Type": contentTypeMap[fileExtension] };
  }
}
