import fs from "fs";
import http, { Server } from "http";
import { ContentType, RestServer } from "./RestServer";

type HTTPResponse = http.ServerResponse<http.IncomingMessage>;

export class HTTPServer extends RestServer {
  private server: Server | null = null;

  constructor() {
    super();

    this.server = http.createServer((request, response) => {
      console.log(request.url);

      if (request.url === "/") {
        this.staticFileResponse(
          "./public/index.html",
          this.htmlContentType,
          response
        );
        return;
      }

      const contentType = this.getContentTypeHeader(request.url);

      this.staticFileResponse(`./public${request.url}`, contentType, response);
    });
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
}
