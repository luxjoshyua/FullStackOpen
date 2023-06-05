import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { NoteForm } from './NoteForm'
import userEvent from '@testing-library/user-event'

describe('<NoteForm /> component', () => {
  test('<NoteForm /> updates parent state and calls onSubmit', async () => {
    const createNote = jest.fn()
    const user = userEvent.setup()

    render(<NoteForm createNote={createNote} />)
    // using a container then querying off that is the best way of doing it, keeps tests isolated
    // const { container } = render(<NoteForm createNote={createNote} />)

    // const input = container.querySelector('#note-input')
    const input = screen.getByPlaceholderText('new note here...')
    const sendButton = screen.getByText('save')

    await user.type(input, 'testing a form...')
    await user.click(sendButton)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
  })
})
