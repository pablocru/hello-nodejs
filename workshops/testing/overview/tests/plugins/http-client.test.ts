// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import plugins from "@hello-nodejs/design-pattern-adapter/plugins";

const { httpClient: httpClientPlugin } = plugins;
const { httpClient } = httpClientPlugin;

describe("Plugin: Http Client", () => {
  it("should be defined", () => {
    expect(httpClientPlugin).toBeDefined();
    expect(httpClient).toBeDefined();
  });
});

describe('Plugin: Http Client, Function: "get()"', () => {
  const { get } = httpClient;

  it("should be defined", () => {
    expect(get).toBeDefined();
  });

  it("should perform a http request", async () => {
    const response = await get("https://jsonplaceholder.typicode.com/todos/1");

    expect(response).toEqual({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      completed: expect.any(Boolean),
    });
  });
});
