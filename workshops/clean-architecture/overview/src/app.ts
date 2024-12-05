import argumentManager from "./plugins/argument-manager.plugin";
import { ServerApp } from "./presentation/server-app";

main();

function main() {
  ServerApp.run(argumentManager);
}
