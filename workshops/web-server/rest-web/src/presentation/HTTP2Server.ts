import fs from "fs";
import http2, { Http2SecureServer } from "http2";
import { ContentType, RestServer } from "./RestServer";

type HTTPResponse = http2.Http2ServerResponse<http2.Http2ServerRequest>;

export class HTTP2Server extends RestServer {
  private server: Http2SecureServer | null = null;

  constructor() {
    super();

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

        const contentType = this.getContentTypeHeader(request.url);

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
}
