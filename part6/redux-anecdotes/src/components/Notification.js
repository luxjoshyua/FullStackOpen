// import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  // const notification = useSelector(({ notification }) => notification)
  const notification = useSelector((state) => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: '1rem',
  }

  return notification && <div style={style}>{notification}</div>
}

export default Notification
