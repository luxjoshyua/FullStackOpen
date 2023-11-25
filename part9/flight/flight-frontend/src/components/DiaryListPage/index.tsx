// import { useState } from 'react'
import {
  Box,
  Table,
  TableHead,
  Typography,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";
import { Diary } from "../../types";
import AddDiaryForm from "../DiaryFormPage";

interface Props {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const DiaryListPage = ({ diaries, setDiaries }: Props) => {
  const submitNewDiary = async () => {
    console.log("submitting diary entry yeeew");
    setDiaries({});
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
      <AddDiaryForm onSubmit={submitNewDiary} />
    </div>
  );
};

export default DiaryListPage;
