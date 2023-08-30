import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import store from './store'
import './index.css'

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>
)
