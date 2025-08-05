import fs from "fs";
import http from "http";

const htmlContentType = { "Content-Type": "text/html" };
const cssContentType = { "Content-Type": "text/css" };
const jsContentType = { "Content-Type": "application/javascript" };

type HTTPResponse = http.ServerResponse<http.IncomingMessage>;

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

  switch (request.url) {
    case "/": {
      staticFileResponse("./public/index.html", htmlContentType, response);
      break;
    }
    case "/style/main.css": {
      staticFileResponse("./public/style/main.css", cssContentType, response);
      break;
    }
    case "/js/main.js": {
      staticFileResponse("./public/js/main.js", jsContentType, response);
      break;
    }
    default:
      response.writeHead(404, htmlContentType).end();
  }
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
