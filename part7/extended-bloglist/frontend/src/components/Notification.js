import { useSelector } from 'react-redux'
import { Container, Alert } from '@mui/material'

const Notification = () => {
	const notification = useSelector((state) => state.notification)

	console.log(`notification`, notification)

	const styleSuccess = {
		border: '2px solid green',
		background: 'turquoise',
		padding: 10,
		borderWidth: 1,
		marginBottom: '1rem'
	}

	const styleError = { ...styleSuccess, border: '2px solid red', background: 'orange' }

	if (notification.message === '') {
		return null
	}

	// return (
	// 	<div className="notification" style={notification.error ? styleError : styleSuccess}>
	// 		<span style={{ display: 'block' }}>{notification.message}</span>
	// 	</div>
	// )

	return (
		<Container style={notification.error ? styleError : styleSuccess}>
			<Alert>{notification.message}</Alert>
		</Container>
	)
}

export default Notification
