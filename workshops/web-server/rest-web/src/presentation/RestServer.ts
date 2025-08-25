export interface RestServer {
  start(port: number): void;
  stop(): void;
}
