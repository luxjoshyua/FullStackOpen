export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export interface Diary {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment?: string
}

export type NewDiaryEntry = Omit<Diary, 'id'>

export type NonSensitiveDiaryEntry = Omit<Diary, 'comment'>

export type DiaryFormValues = Omit<Diary, 'id'>
