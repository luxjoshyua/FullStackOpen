import { Gender, NewPatientEntry } from "../types";

// fields we need to type check
// name: "Martin Riggs",
// dateOfBirth: "1979-01-30",
// ssn: "300179-77A",
// gender: "male",
// occupation: "Cop",

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

const isDateOfBirth = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDateOfBirth(dateOfBirth)) {
    throw new Error("Incorrect or missing date: " + dateOfBirth);
  }

  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing SSN");
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

// object is the body of a request, point of this function is to map fields
// of unknown type to fields of the correct type and check whether
// they are defined as expected
const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  // console.log(object);
  // fake entry
  // const newEntry: NewPatientEntry = {
  //   name: "Sam Smith",
  //   dateOfBirth: "1991-01-05",
  //   ssn: "050174-432N",
  //   gender: "male",
  //   occupation: "Cool Cat",
  // };

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newEntry;
  }

  // if the guard does not evaluate to true, exception is thrown
  throw new Error("Incorrect data: some fields are missing");
};

export default toNewPatientEntry;
