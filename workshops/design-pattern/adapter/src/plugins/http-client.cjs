class HTTPResponseError extends Error {
  statusCode;
  message;

  constructor(statusCode, message) {
    super(statusCode + " : " + message);

    this.statusCode = statusCode;
    this.message = message;
  }
}

const httpClient = {
  /** @param {string} url */
  get: async (url) => {
    const response = await fetch(url);

    if (!response.ok)
      throw new HTTPResponseError(response.status, response.statusText);

    return await response.json();
  },
};

module.exports = { httpClient };
