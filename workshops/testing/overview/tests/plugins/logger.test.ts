// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import plugins from "@hello-nodejs/design-pattern-adapter/plugins";

const { logger } = plugins;

describe("Plugin: Logger", () => {
  it("should be defined", () => {
    expect(logger).toBeDefined();
  });
});

const { configureLogger } = logger;

describe('Plugin: Logger, Function: "configureLogger()"', () => {
  it("should be defined", () => {
    expect(configureLogger).toBeDefined();
  });

  it("should return logger methods", () => {
    const logger = configureLogger("test");

    expect(logger).toEqual({
      log: expect.any(Function),
      error: expect.any(Function),
    });
  });
});
