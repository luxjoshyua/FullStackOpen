import { TextField, Button } from '@mui/material'
// import Notification from './Notification'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const contentField = useField('content')
  const authorField = useField('author')
  const infoField = useField('info')

  // const [notification, setNotification] = useState('')

  const content = contentField.value
  const author = authorField.value
  const info = authorField.value

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0,
    })
  }

  const handleReset = () => {
    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>

      <form onSubmit={handleSubmit}>
        <div>
          content
          {/* <input name="content" value={content} onChange={(e) => setContent(e.target.value)} /> */}
          <TextField {...contentField} reset={undefined} />
        </div>
        <div>
          author
          <TextField {...authorField} reset={undefined} />
        </div>
        <div>
          url for more info
          <TextField {...infoField} reset={undefined} />
        </div>
        <div style={{ display: 'flex' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            create
          </Button>
          <Button variant="contained" color="error" onClick={handleReset}>
            reset
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateNew
