import React from 'react';
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux'
import Navbar from './containers/Navbar'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<Provider store={store}>
			<ToastContainer />
			<Navbar />
			<Header />
		</Provider>
	);
}

export default App
