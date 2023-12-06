import { useState, SyntheticEvent, useContext } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Input,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { EntryWithoutId, Diagnosis, HealthCheckRating } from "../../types";
import { DiagnosesContext } from "../../context";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

interface HealthCheckRatingOption {
  value: number;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
)
  .filter((value) => typeof value === "number")
  .map((value) => ({
    value: value as number,
    label: HealthCheckRating[value as number],
  }));

/**
 * TOFIX
 * - HealthCheckRating is breaking
 * Diagnoses is breaking
 */

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [specialist, setSpecialist] = useState("");
  // const [diagnosisCodes, setDiagnosisCodes] = useState<
  //   Array<Diagnosis["code"]>
  // >([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.LowRisk
  );
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [entryOptions, setEntryOptions] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const diagnoses = useContext(DiagnosesContext);

  const handleHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    // needs to be set to number type, otherwise will break
    const value = Number(event.target.value);
    console.log(value);

    // const healthCheckRating = Object.values(HealthCheckRating);

    if (typeof value === "number") {
      console.log("getting here.....");
      setHealthCheckRating(value);
    }

    // if (value && healthCheckRating.includes(value)) {
    //   console.log("getting here.....");
    //   setHealthCheckRating(value);
    // }
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    setDiagnosisCodes(value as string[]);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    // console.log(`Diagnosis Codes`, diagnosisCodes);

    switch (entryOptions) {
      case "HealthCheck":
        console.log("getting to HealthCheck submit entry");
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      case "Hospital":
        console.log("getting to Hospital submit entry");
        // console.log(baseEntry);
        onSubmit({
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case "OccupationalHealthcare":
        console.log("getting to OccupationalHealthcare submit entry");
        onSubmit({
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? {
                  startDate: dischargeDate,
                  endDate: dischargeCriteria,
                }
              : undefined,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: ".5rem" }}>
        New entry
      </Typography>
      <InputLabel style={{ marginBottom: ".25rem" }}>Entry options</InputLabel>
      <Select
        label="Entry options"
        fullWidth
        value={entryOptions}
        onChange={({ target }) => setEntryOptions(target.value)}
        style={{ marginBottom: "1rem" }}
      >
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          Occupational Healthcare
        </MenuItem>
      </Select>

      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <InputLabel>Date</InputLabel>
        <Input
          fullWidth
          value={date}
          type="date"
          onChange={({ target }) => setDate(target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Employer name"
          placeholder="Employer name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <TextField
          label="Specialist"
          placeholder="Specialist name"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            label="Diagnosis Codes"
            fullWidth
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            style={{ marginBottom: "1rem" }}
            input={<OutlinedInput label="Multiple Select" />}
          >
            {diagnoses.map((diagnosis) => {
              return (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  diagnosis code: {diagnosis.code}
                </MenuItem>
              );
            })}
          </Select>
        </>

        {entryOptions == "HealthCheck" && (
          <>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value=""
              onChange={handleHealthCheckRatingChange}
              style={{ marginBottom: "1rem" }}
              input={<OutlinedInput label="Health Check Rating" />}
            >
              {healthCheckRatingOptions.map((rating) => {
                // console.log(rating)
                return (
                  <MenuItem key={rating.label} value={rating.value}>
                    Health check rating: {rating.label}
                  </MenuItem>
                );
              })}
            </Select>
          </>
        )}

        {entryOptions == "OccupationalHealthcare" && (
          <>
            <InputLabel>Sick Leave Start Date</InputLabel>
            <Input
              fullWidth
              value={sickLeaveStart}
              type="date"
              onChange={({ target }) => setSickLeaveStart(target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <InputLabel>Sick Leave End Date</InputLabel>
            <Input
              fullWidth
              value={sickLeaveEnd}
              type="date"
              onChange={({ target }) => setSickLeaveEnd(target.value)}
              style={{ marginBottom: "1rem" }}
            />
          </>
        )}

        {entryOptions === "Hospital" && (
          <>
            <InputLabel>Discharge Date</InputLabel>
            <Input
              fullWidth
              value={dischargeDate}
              type="date"
              onChange={({ target }) => setDischargeDate(target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <InputLabel>Discharge Criteria</InputLabel>
            <Input
              fullWidth
              value={dischargeCriteria}
              type="text"
              onChange={({ target }) => setDischargeCriteria(target.value)}
              style={{ marginBottom: "1rem" }}
            />
          </>
        )}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
