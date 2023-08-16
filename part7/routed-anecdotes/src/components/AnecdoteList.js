import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

const AnecdoteList = ({ anecdotes }) => {
  // return (
  //   <div>
  //     <h2>Anecdotes</h2>
  //     <ul>
  //       {anecdotes.map((anecdote) => (
  //         <li key={anecdote.id}>
  //           <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // )

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <h2>Anecdotes</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {anecdotes.map((anecdote) => (
              <TableRow key={anecdote.id}>
                <TableCell>
                  <Link to={`/anecdotes/${anecdote.id}`}>
                    <span style={{ display: 'block', color: 'initial' }}>{anecdote.content}</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default AnecdoteList
