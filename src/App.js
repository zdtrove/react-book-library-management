import React from 'react';
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModalContainer from './containers/Modal/'
import NavbarContainer from './containers/Navbar/'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import CartContainer from './containers/Cart'

function App() {
	return (
		<Provider store={store}>
			<Router>
				<NavbarContainer />
				<Switch>
		        	<Route exact path="/">
		        		<Home />
		        	</Route>
		        	<Route path="/products">
		        		<Products />
		        	</Route>
		        </Switch>
		        <CartContainer />
				<ToastContainer />
				<ModalContainer />
			</Router>
		</Provider>
	);
}

export default App
