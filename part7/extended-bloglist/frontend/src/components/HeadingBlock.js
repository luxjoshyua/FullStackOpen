import Notification from './Notification'

const HeadingBlock = ({ heading }) => {
	return (
		<div>
			<h1 className="header-title">{heading}</h1>
			<Notification className="notification" />
		</div>
	)
}

export default HeadingBlock
