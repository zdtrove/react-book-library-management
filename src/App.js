import React from 'react';
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux'
import Home from './components/Home/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<Provider store={store}>
			<ToastContainer />
			<Home />
		</Provider>
	);
}

export default App
