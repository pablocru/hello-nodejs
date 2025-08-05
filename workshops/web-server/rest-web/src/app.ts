import fs from "fs";
import http from "http";

const htmlContentType = { "Content-Type": "text/html" };
const cssContentType = { "Content-Type": "text/css" };
const jsContentType = { "Content-Type": "application/javascript" };

const server = http.createServer((request, response) => {
  console.log(request.url);

  switch (request.url) {
    case "/": {
      fs.readFile("./public/index.html", (err, readFile) => {
        if (err) {
          response
            .writeHead(500, htmlContentType)
            .end("<h1>Internal Server Error</h1>");
          return;
        }
        response.writeHead(200, htmlContentType).end(readFile);
      });
      break;
    }
    case "/style/main.css": {
      fs.readFile("./public/style/main.css", (err, readFile) => {
        if (err) {
          response
            .writeHead(500, htmlContentType)
            .end("<h1>Internal Server Error</h1>");
          return;
        }
        response.writeHead(200, cssContentType).end(readFile);
      });
      break;
    }
    case "/js/main.js": {
      fs.readFile("./public/js/main.js", (err, readFile) => {
        if (err) {
          response
            .writeHead(500, htmlContentType)
            .end("<h1>Internal Server Error</h1>");
          return;
        }
        response.writeHead(200, jsContentType).end(readFile);
      });
      break;
    }
    default:
      response.writeHead(404, htmlContentType).end();
  }
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
