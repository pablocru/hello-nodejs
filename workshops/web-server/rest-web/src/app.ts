import fs from "fs";
import http from "http";

const htmlContentType = { "Content-Type": "text/html" };

const server = http.createServer((request, response) => {
  console.log(request.url);

  switch (request.url) {
    case "/": {
      const htmlFile = fs.readFileSync("./public/index.html");
      response.writeHead(200, htmlContentType).end(htmlFile);
      break;
    }
    default:
      response.writeHead(404, htmlContentType).end();
  }
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
