// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import plugins from "@hello-nodejs/design-pattern-adapter/plugins";

const {
  date,
  logger: { configureLogger },
} = plugins;

const myConsole = configureLogger("app");

const birthday = date.getLongDateFromString("1996-06-28");

myConsole.log({ birthday });
