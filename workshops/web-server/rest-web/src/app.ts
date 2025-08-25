import { HTTP2Server } from "./presentation/HTTP2Server";

const http2Server = new HTTP2Server();
http2Server.start(8080);
