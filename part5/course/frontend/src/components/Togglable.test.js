import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Togglable } from './Togglable'

describe('<Togglable /> component', () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container
  })

  test('renders its children', async () => {
    // const element = screen.getByText('togglable content')
    // screen.debug(element)
    await screen.findAllByText('togglable content')
  })

  // verifies that the child component of the Togglable component is not visible initially
  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    // https://www.npmjs.com/package/@testing-library/jest-dom#tohavestyle
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can be closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show...')
    await user.click(button)

    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)

    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })
})
