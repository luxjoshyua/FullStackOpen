/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSSNPatientEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a patient entry");

  const { id, name, dateOfBirth, gender, occupation } = req.body;

  const addedPatientEntry = patientService.addPatient({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  });
  res.json(addedPatientEntry);
});

export default router;
