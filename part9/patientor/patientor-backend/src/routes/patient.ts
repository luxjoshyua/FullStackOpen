import express from "express";
import patientService from "../services/patientService";

import toNewPatientEntry from "../utilities/utils";
import toNewEntry from "../utilities/toNewEntry";

const router = express.Router();

router.get("/", (_req, res) => {
  // res.send(patientService.getNonSSNPatientEntries());
  res.send(patientService.getPatients());
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

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const entry = patientService.getPatient(id);
  if (entry) {
    res.status(200).json(entry);
  } else {
    res.status(404).send("Patient not found");
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const id = req.params.id;
    const patient = patientService.getPatient(id);

    if (!patient) {
      res.status(404).send("Patient not found");
      // need to return here, otherwise will continue and error
      return;
    }

    const newEntry = toNewEntry(req.body as object);
    const addedEntry = patientService.addEntry(patient, newEntry);
    // console.log(`addedEntry: `, addedEntry);
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
