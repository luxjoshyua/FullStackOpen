import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { DiaryFormValues, Visibility, Weather } from "../../types";

interface Props {
  onSubmit: (values: DiaryFormValues) => void;
  error?: string;
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

const AddDiaryForm = ({ onSubmit, error }: Props) => {
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

  // console.log(visibilityOptions);

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={addDiaryEntry}>
        <Typography variant="h6" sx={{ marginBottom: "20px" }}>
          Diary Entry Form
        </Typography>
        <TextField
          fullWidth
          value={date}
          type="date"
          onChange={({ target }) => setDate(target.value)}
          sx={{
            color: "white",
            marginBottom: "20px",
            "& input": {
              color: "white",
            },
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
        />

        {/* <InputLabel style={{ marginTop: 20, color: "white" }}>
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
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          {visibilityOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select> */}

        {/* <InputLabel style={{ marginTop: 20, color: "white" }}>
          Visibility
        </InputLabel> */}
        <div style={{ marginBottom: "20px" }}>
          <FormControl>
            <FormLabel sx={{ color: "white" }}>Visibility</FormLabel>
            <RadioGroup
              aria-label="Visibility"
              name="visibility"
              value={visibility}
              onChange={onVisibilityChange}
              row
              sx={{
                color: "white",
                "& .MuiFormLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            >
              {visibilityOptions.map((option) => (
                <FormControlLabel
                  control={<Radio />}
                  key={option.label}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>

        {/* <InputLabel style={{ marginTop: 20, color: "white" }}>
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
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          {weatherOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select> */}
        <div style={{ marginBottom: "20px" }}>
          <FormControl>
            <FormLabel sx={{ color: "white" }}>Weather</FormLabel>
            <RadioGroup
              aria-label="Weather"
              name="weather"
              value={weather}
              onChange={onWeatherChange}
              row
              sx={{
                color: "white",
                "& .MuiFormLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            >
              {weatherOptions.map((option) => (
                <FormControlLabel
                  control={<Radio />}
                  key={option.label}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>

        <TextField
          label="Comment"
          placeholder="diary entry comment..."
          fullWidth
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          sx={{
            color: "white",
            marginBottom: "20px",
            "& input": {
              color: "white",
            },
            "& .MuiFormLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          }}
        />

        <Button variant="contained" type="submit">
          Add New Diary Entry
        </Button>
      </form>
    </div>
  );
};

export default AddDiaryForm;
