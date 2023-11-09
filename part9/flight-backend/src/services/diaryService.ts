import diaries from "../../data/diaries";
import { NonSensitiveDiaryEntry, DiaryEntry } from "../types";

const getEntries = (): DiaryEntry[] => {
  return diaries;
};

// exclude the comments field as it isn't returned and will throw undefined error
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = () => {
  return null;
};

// return single diaryentry
// no guarantee specified id can be found, so throws error
const findById = (id: number): DiaryEntry | undefined => {
  // find method returns undefined if the object is not found
  const entry = diaries.find((d) => d.id === id);
  return entry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
