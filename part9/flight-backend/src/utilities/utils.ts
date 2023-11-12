import { Weather, Visibility, NewDiaryEntry } from "../types";

/**
 * function is a type-guard, meaning it returns a boolean and has a type predicate
 * as the return type. In this case, the type predicate is `text is string`
 * type predicate usually follows the pattern parameterName is Type
 * parameterName is the name of the function parameter
 * Type is the targeted type
 * if the type guard function returns true, the ts compiler knows that the tested variable
 * has the type that was defined in the type predicate
 * using a type guard that returns a type predicate is one way to do type narrowing
 * ie giving a variable a more strict or accurate type
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
const isString = (text: unknown): text is string => {
  // two different ways to create a string in js, one as a primitive, the other as an object,
  // so need to check for both
  // return typeof text === 'string' will suffice for most cases
  return typeof text === "string" || text instanceof String;
};

/**
 * function gets a parameter of type unknown and returns it as type string
 * if it exists and is of the right type
 */
const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error("Incorrect or missing comment");
  }

  return comment;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }

  return date;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map((v) => v.toString())
    .includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather: " + weather);
  }

  return weather;
};

// type guard
const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param);
};

// parser
const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility: " + visibility);
  }

  return visibility;
};

/**
 * function maps fields of unknown type to fields of the correct type
 * and checks whether they are defined as expected, so we need to allow the any type
 * unknown is the bes solution for this kind of input validation, as we can first
 * verify the type and then confirm that is the expected type
 *
 */
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  // checks the fields exist in the object, so don't need existence check in parsers
  //  e.g. !visibility in parseVisibility or !weather in parseWeather
  if (
    "comment" in object &&
    "date" in object &&
    "weather" in object &&
    "visibility" in object
  ) {
    const newEntry: NewDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment),
    };

    return newEntry;
  }

  // if the guard does not evaluate to true, an exception is thrown
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewDiaryEntry;
