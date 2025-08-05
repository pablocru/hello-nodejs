import http from "http";

const greet = "Hello, World!";

const server = http.createServer((request, response) => {
  console.log(request.url);

  response.write(greet);
  response.end();
});

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
