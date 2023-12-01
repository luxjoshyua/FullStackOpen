import { Diagnosis, BaseEntry } from "../types";
/**
 * date - string
 * type - string
 * specialist - string
 * diagnosisCodes - array of strings
 * description - string
 * discharge - object with date and criteria, both strings
 * employerName - string
 * sickLeave - object with startDate and endDate, both strings
 *
 *
 */

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const parseDescription = (description: string) => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }

  return description;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const parseSpecialist = (specialist: string): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}`);
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

// healthCheckRating
const parseHealthCheckRating = (number: unknown): number => {
  if (!number || !isNumber(number)) {
    throw new Error(`Incorrect or missing number: ${number}`);
  }

  return number;
};
