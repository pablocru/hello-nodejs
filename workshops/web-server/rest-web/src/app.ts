import http from "http";

const greet = "Hello, World!";

const server = http.createServer((request, response) => {
  console.log(request.url);

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(`<h1>${greet}</h1>`);
  response.end();
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
