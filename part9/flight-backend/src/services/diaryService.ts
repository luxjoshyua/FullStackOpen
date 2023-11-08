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

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
};
