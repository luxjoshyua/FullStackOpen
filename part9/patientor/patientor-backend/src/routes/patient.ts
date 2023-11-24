import express from "express";
import patientService from "../services/patientService";

import toNewPatientEntry from "../utilities/utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSSNPatientEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body as object);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
