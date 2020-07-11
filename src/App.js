import React from 'react';
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux'
import Home from './components/Home/Home'

function App() {
	return (
		<Provider store={store}>
			<Home />
		</Provider>
	);
}

export default App
