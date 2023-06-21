import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

// import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const { notifications } = useSelector(({ notification }) => notification)
  const [alert, setAlert] = useState({ message: '' })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (notifications.length > 0) {
      setAlert({ message: notifications[0].message })
      setShow(true)
    }
  }, [notifications])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  // console.log('ALERT', alert)
  // console.log('SHOW', show)

  if (show) {
    return <div style={style}>{alert.message}</div>
  } else {
    return null
  }
}

export default Notification
