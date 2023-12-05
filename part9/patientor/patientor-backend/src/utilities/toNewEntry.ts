import {
  Diagnosis,
  Entry,
  EntryWithoutId,
  Discharge,
  SickLeave,
  HealthCheckRating,
} from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }

  return description;
};

const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
    throw new Error(`Incorrect or missing criteria: ${criteria}`);
  }

  return criteria;
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

const parseSpecialist = (specialist: unknown): string => {
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

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isNumber(healthCheckRating)) {
    throw new Error(
      `Incorrect or missing healthCheckRating: ${healthCheckRating}`
    );
  }

  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employerName: ${employerName}`);
  }
  return employerName;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("date" in object && "criteria" in object) {
    const discharge: Discharge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };

    return discharge;
  }

  throw new Error("Incorrect or missing discharge data");
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if ("startDate" in object && "endDate" in object) {
    const sickLeave: SickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };

    return sickLeave;
  }

  throw new Error("Incorrect or missing sickleave data");
};

// check object is of type Entry
const isEntry = (entry: unknown): entry is Entry => {
  if (!entry || typeof entry !== "object" || !("type" in entry)) {
    throw new Error("Incorrect or missing data");
  }

  if (!("description" in entry && "date" in entry && "specialist" in entry)) {
    throw new Error("Incorrect or missing data");
  }

  return (
    entry.type === "Hospital" ||
    entry.type === "HealthCheck" ||
    entry.type === "OccupationalHealthcare"
  );
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object" || !("type" in object)) {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("description" in object && "date" in object && "specialist" in object)
  ) {
    throw new Error("Incorrect or missing data");
  }

  if (!isEntry(object)) {
    throw new Error("Incorrect or missing data");
  }

  switch (object.type) {
    case "Hospital":
      if ("discharge" in object) {
        const newEntry: EntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          type: object.type,
          discharge: parseDischarge(object.discharge),
        };
        return newEntry;
      } else {
        throw new Error("Incorrect or missing discharge data");
      }
    case "OccupationalHealthcare":
      if ("sickLeave" in object && "employerName" in object) {
        const newEntry: EntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          type: object.type,
          employerName: parseEmployerName(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave),
        };
        return newEntry;
      } else {
        throw new Error("Incorrect or missing sickLeave or employerName data");
      }
    case "HealthCheck":
      if ("healthCheckRating" in object) {
        const newEntry: EntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          type: object.type,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return newEntry;
      } else {
        throw new Error("Incorrect or missing healthCheckRating data");
      }
    default:
      throw new Error(`Incorrect or missing type`);
  }
};

export default toNewEntry;
