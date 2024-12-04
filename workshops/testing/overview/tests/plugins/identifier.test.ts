// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import plugins from "@hello-nodejs/design-pattern-adapter/plugins";

const { identifier } = plugins;

describe("Plugin: Identifier", () => {
  it("should be defined", () => {
    expect(identifier).toBeDefined();
  });
});

describe('Plugin: Identifier, Function: "getIdentifier()"', () => {
  const { getIdentifier } = identifier;
  it("should be defined", () => {
    expect(getIdentifier).toBeDefined();
  });

  const id = getIdentifier();

  it("should return a string", () => {
    expect(typeof id).toBe("string");
  });

  it("should be 36 character length", () => {
    expect(id.length).toBe(36);
  });
});
