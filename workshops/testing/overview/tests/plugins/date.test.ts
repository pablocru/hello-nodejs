// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import plugins from "@hello-nodejs/design-pattern-adapter/plugins";

const { date } = plugins;

const INVALID_DATE_ERROR_MESSAGE = "The date provided is invalid";

interface InvalidDateEntry {
  strDate: string;
  message: string;
}

const INVALID_DATE_LIST: InvalidDateEntry[] = [
  {
    strDate: "",
    message: "an empty string",
  },
  {
    strDate: "invalid date",
    message: "a sentence",
  },
  {
    strDate: "28-06-1996",
    message: "a string date with an invalid ISO format",
  },
];

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function sharedChecks(functionToTest: Function) {
  it(`should be defined`, () => {
    expect(functionToTest).toBeDefined();
  });

  const spyConsoleWarn = jest
    .spyOn(console, "warn")
    .mockImplementation(jest.fn());

  INVALID_DATE_LIST.forEach(({ strDate, message }) => {
    it(`should throw an error if the argument is ${message}`, () => {
      expect(() => functionToTest(strDate)).toThrow(INVALID_DATE_ERROR_MESSAGE);
    });
  });

  spyConsoleWarn.mockClear();
}

describe("Plugin: Date", () => {
  it("should be defined", () => {
    expect(date).toBeDefined();
  });
});

describe('Plugin: Date, Function: "getLongDateFromString()"', () => {
  const { getLongDateFromString } = date;

  sharedChecks(getLongDateFromString);
});

describe('Plugin: Date, Function: "getYearDiffInNumber()"', () => {
  const { getYearDiffInNumber } = date;

  sharedChecks(getYearDiffInNumber);
});
