import fs from "fs";
import http from "http";

type HTTPResponse = http.ServerResponse<http.IncomingMessage>;

enum FileExtension {
  HTML = "html",
  CSS = "css",
  JS = "js",
  TEXT = "text",
}

type ContentTypeMap = Record<FileExtension, string>;

function getContentType(fileExtension: FileExtension) {
  const contentTypeMap: ContentTypeMap = {
    [FileExtension.HTML]: "text/html",
    [FileExtension.CSS]: "text/css",
    [FileExtension.JS]: "application/javascript",
    [FileExtension.TEXT]: "text/plain",
  };

  return { "Content-Type": contentTypeMap[fileExtension] };
}

const htmlContentType = getContentType(FileExtension.HTML);
const cssContentType = getContentType(FileExtension.CSS);
const jsContentType = getContentType(FileExtension.JS);
const textContentType = getContentType(FileExtension.TEXT);

function internalErrorResponse(response: HTTPResponse) {
  response
    .writeHead(500, htmlContentType)
    .end("<h1>Internal Server Error</h1>");
}

function staticFileResponse(
  staticFile: string,
  contentType: { "Content-Type": string },
  response: HTTPResponse
) {
  fs.readFile(staticFile, (err, readFile) => {
    if (err) {
      internalErrorResponse(response);
      return;
    }
    response.writeHead(200, contentType).end(readFile);
  });
}

const server = http.createServer((request, response) => {
  console.log(request.url);

  if (request.url === "/") {
    staticFileResponse("./public/index.html", htmlContentType, response);
    return;
  }

  const contentType = request.url?.endsWith(".css")
    ? cssContentType
    : request.url?.endsWith(".js")
    ? jsContentType
    : textContentType;
  staticFileResponse(`./public${request.url}`, contentType, response);
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
