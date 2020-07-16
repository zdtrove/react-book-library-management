import React from 'react';
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux'
import NavbarContainer from './containers/Navbar'
import CartContainer from './containers/Cart'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProductsContainer from './containers/Products';
import ModalCommon from './components/Modal/ModalCommon'

function App() {
	return (
		<Provider store={store}>
			<ToastContainer />
			<NavbarContainer />
			<ProductsContainer />
			<CartContainer />
			<ModalCommon />
		</Provider>
	);
}

export default App
