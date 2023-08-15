import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
      {/* {notification && <Notification notification={notification} />} */}

      <form onSubmit={handleSubmit}>
        <div>
          content
          {/* <input name="content" value={content} onChange={(e) => setContent(e.target.value)} /> */}
          {/* <input {...contentField} reset={undefined} /> */}
          <TextField {...contentField} reset={undefined} />
        </div>
        <div>
          author
          {/* <input name="author" value={author} onChange={(e) => setAuthor(e.target.value)} /> */}
          {/* <input {...authorField} reset={undefined} /> */}
          <TextField {...authorField} reset={undefined} />
        </div>
        <div>
          url for more info
          {/* <input name="info" value={info} onChange={(e) => setInfo(e.target.value)} /> */}
          {/* <input {...infoField} reset={undefined} /> */}
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
