import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Note } from './Note'

describe('<Note /> component', () => {
  test('renders content', () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true,
    }

    // renders out the component for testing purposes
    // doesn't render to the DOM
    render(<Note note={note} />)

    // screen.debug()

    // screen is a method that has multiple methods attached to it
    const element = screen.getByText('Component testing is done with react-testing-library')

    // can pass just the element wanting to test to render
    // screen.debug(element)

    expect(element).toBeDefined()

    // other way of writing it
    // const { container } = render(<Note note={note} />)
    // const div = container.querySelector('.note')
    // expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  })

  test('clicking the button calls event handler once', async () => {
    const note = {
      content: 'Component testing is done with react-testing-library',
      important: true,
    }

    const mockHandler = jest.fn()

    render(<Note note={note} toggleImportance={mockHandler} />)

    // starts a session to interact with the rendered component
    // https://testing-library.com/docs/user-event/setup/
    const user = userEvent.setup()

    // test finds the button based on the text from the rendered component and clicks the element
    const button = screen.getByText('make not important')
    await user.click(button)

    // verify the function is called once
    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})
