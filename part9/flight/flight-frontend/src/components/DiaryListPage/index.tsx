import { useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { Diary, DiaryFormValues } from "../../types";
import AddDiaryForm from "../DiaryFormPage";
import diaryService from "../../services/diaries";

interface Props {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryListPage = ({ diaries, setDiaries }: Props) => {
  const [error, setError] = useState<string>();

  const submitNewDiaryEntry = async (values: DiaryFormValues) => {
    try {
      const diary = await diaryService.create(values);
      // console.log(`submitting diary = `, diary);
      setDiaries(diaries.concat(diary));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <Box>
        <Typography align="center" variant="h6">
          Diary entries
        </Typography>
      </Box>
      <Table style={{ marginBottom: "1em", color: "white" }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Date</TableCell>
            <TableCell sx={{ color: "white" }}>Visibility</TableCell>
            <TableCell sx={{ color: "white" }}>Weather</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(diaries).map((diary: Diary) => (
            <TableRow key={diary.id}>
              <TableCell sx={{ color: "white" }}>{diary.date}</TableCell>
              <TableCell sx={{ color: "white" }}>{diary.visibility}</TableCell>
              <TableCell sx={{ color: "white" }}>{diary.weather}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddDiaryForm onSubmit={submitNewDiaryEntry} error={error} />
    </div>
  );
};

export default DiaryListPage;
