import React from 'react'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null
  return (
    <div
      style={{
        color: 'red',
        border: '2px solid red',
        fontSize: '2rem',
        backgroundColor: 'lawngreen',
        width: '100%',
        padding: '.5rem',
      }}>
      {errorMessage}
    </div>
  )
}

export default Notify
