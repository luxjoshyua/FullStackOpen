import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Divider, Container, Typography } from '@mui/material'

import { Diary } from './types'
import diaryService from './services/diaries'
import DiaryListPage from './components/DiaryListPage'

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    // void indicates that the expected response data is empty or undefined
    // void axios.get<void>(`${apiBaseUrl}/ping`)

    const fetchDiaryList = async () => {
      const diaries = await diaryService.getAll()
      setDiaries(diaries)
    }
    // indciates the function does not return any value
    void fetchDiaryList()
  }, [])

  // console.log(diaries)

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ margin: '0.5em 0' }}>
          Flight Diaries
        </Typography>
        <DiaryListPage diaries={diaries} />
      </Container>
    </div>
  )
}

export default App
