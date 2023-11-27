import { Male, Female, Transgender } from '@mui/icons-material'
import { Gender } from '../../types'

const GenderIcon = ({ gender }: { gender: Gender }) => {
  return (
    <>
      {gender === Gender.Male && <Male />}
      {gender === Gender.Female && <Female />}
      {gender === Gender.Other && <Transgender />}
    </>
  )
}

export default GenderIcon
