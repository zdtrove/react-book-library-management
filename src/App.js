import React from 'react';
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux'
import Navbar from './containers/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductsContainer from './containers/Products/ProductsContainer';
import CartContainer from './containers/Cart/CartContainer';

function App() {
	return (
		<Provider store={store}>
			<ToastContainer />
			<Navbar />
			<ProductsContainer />
			<CartContainer />
		</Provider>
	);
}

export default App
