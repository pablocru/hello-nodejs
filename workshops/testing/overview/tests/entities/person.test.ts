// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import entities from "@hello-nodejs/design-pattern-adapter/entities";

const { person } = entities;

describe("Entity: Person", () => {
  it("should be defined", () => {
    expect(person).toBeDefined();
  });
});

const { configureMakePerson } = person;

const getIdentifier = () => "1";
const getBirthday = () => "Someday";
const getAge = () => 28;

describe('Entity: Person, Function: "configureMakePerson()"', () => {
  it("should be defined", () => {
    expect(configureMakePerson).toBeDefined();
  });

  const makePerson = configureMakePerson(getIdentifier, getBirthday, getAge);

  it("should return a function", () => {
    expect(typeof makePerson).toBe("function");
  });

  it('"makePerson()" should return a "Person" obj', () => {
    const person = makePerson("Pablo", "1996-06-28");

    expect(person).toStrictEqual({
      id: "1",
      birthdate: "Someday",
      age: 28,
      name: "Pablo",
    });
  });
});
