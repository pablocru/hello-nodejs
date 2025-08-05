import fs from "fs";
import http from "http";

const server = http.createServer((request, response) => {
  console.log(request.url);

  const htmlFile = fs.readFileSync("./public/index.html");

  response.writeHead(200, { "Content-Type": "text/html" }).end(htmlFile);
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
