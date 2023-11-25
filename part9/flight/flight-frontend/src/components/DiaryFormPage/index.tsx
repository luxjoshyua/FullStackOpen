import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { DiaryFormValues, Visibility, Weather } from "../../types";

interface Props {
  onSubmit: (values: DiaryFormValues) => void;
}

interface VisibilityOption {
  value: Visibility;
  label: string;
}

interface WeatherOption {
  value: Weather;
  label: string;
}

const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(
  (v) => ({
    value: v,
    label: v.toString(),
  })
);

const weatherOptions: WeatherOption[] = Object.values(Weather).map((v) => ({
  value: v,
  label: v.toString(),
}));

// fields we need
// date: string
// weather: Weather
// visibility: Visibility
//  comment?: string

const AddDiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState(Visibility.Great);
  const [weather, setWeather] = useState(Weather.Sunny);
  const [comment, setComment] = useState("");

  const onVisibilityChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find(
        (v) => v.toString() === value
      );
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  const onWeatherChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const weather = Object.values(Weather).find(
        (w) => w.toString() === value
      );
      if (weather) {
        setWeather(weather);
      }
    }
  };

  const addDiaryEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      weather,
      visibility,
      comment,
    });
  };

  return (
    <div>
      <form onSubmit={addDiaryEntry}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Diary Entry Form
        </Typography>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={{
            color: "white",
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
        />

        <InputLabel style={{ marginTop: 20, color: "white" }}>
          Visibility
        </InputLabel>
        <Select
          label="Visibility"
          fullWidth
          value={visibility}
          onChange={onVisibilityChange}
          sx={{
            color: "white",
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
        >
          {visibilityOptions.map((option) => (
            <MenuItem
              key={option.label}
              value={option.value}
              sx={{ color: "white" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <InputLabel style={{ marginTop: 20, color: "white" }}>
          Weather
        </InputLabel>
        <Select
          label="Weather"
          fullWidth
          value={weather}
          onChange={onWeatherChange}
          sx={{
            color: "white",
            marginBottom: "20px",
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
        >
          {weatherOptions.map((option) => (
            <MenuItem
              key={option.label}
              value={option.value}
              sx={{ color: "white" }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Comment"
          placeholder="diary entry comment..."
          fullWidth
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          sx={{
            color: "white",
            marginBottom: "20px",
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
        />

        <Button variant="contained" onClick={() => console.log("wassup")}>
          Add New Diary Entry
        </Button>
      </form>
    </div>
  );
};

export default AddDiaryForm;
