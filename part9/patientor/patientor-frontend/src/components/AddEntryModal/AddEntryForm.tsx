import { useState, SyntheticEvent, useContext, ChangeEvent } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Input,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { EntryWithoutId, HealthCheckRating } from "../../types";
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
 * - HealthCheckRating is breaking on option 0
 */

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [entryOptions, setEntryOptions] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const diagnoses = useContext(DiagnosesContext);

  const handleHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    const value = Number(event.target.value);
    if (value >= 0 && value <= 3) {
      console.log(value);
      console.log("getting here");
      setHealthCheckRating(value);
    }
  };

  const handleDiagnosisCodesChange = (code: string) => {
    const updatedCodes = [...diagnosisCodes];

    if (updatedCodes.includes(code)) {
      const index = updatedCodes.indexOf(code);
      updatedCodes.splice(index, 1);
    } else {
      updatedCodes.push(code);
    }

    setDiagnosisCodes(updatedCodes);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (entryOptions) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      case "Hospital":
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
          <FormGroup>
            {diagnoses.map((diagnosis) => (
              <FormControlLabel
                key={diagnosis.code}
                control={
                  <Checkbox
                    checked={diagnosisCodes.includes(diagnosis.code)}
                    onChange={() => handleDiagnosisCodesChange(diagnosis.code)}
                  />
                }
                label={`${diagnosis.code} - ${diagnosis.name}`}
              />
            ))}
          </FormGroup>
        </>

        {entryOptions == "HealthCheck" && (
          <>
            <InputLabel sx={{ marginBottom: ".25rem" }}>
              Health Check Rating
            </InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating.toString()}
              onChange={handleHealthCheckRatingChange}
              style={{ marginBottom: "1rem" }}
            >
              {healthCheckRatingOptions.map((rating) => {
                console.log(rating, typeof rating);
                return (
                  <MenuItem key={rating.label} value={rating.value}>
                    {rating.label}
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
