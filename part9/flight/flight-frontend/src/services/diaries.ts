import axios from 'axios'
import { Diary, DiaryFormValues } from '../types'
import { apiBaseUrl } from '../constants'

const getAll = async () => {
  const { data } = await axios.get<Diary[]>(`${apiBaseUrl}/diaries`)

  return data
}

const create = async (object: DiaryFormValues) => {
  const { data } = await axios.post<Diary>(`${apiBaseUrl}/diaries`, object)

  return data
}

export default { getAll, create }
