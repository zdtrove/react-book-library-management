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
import Register from './pages/Register'
import CartContainer from './containers/Cart'
import Login from './pages/Login';

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
		        	<Route path="/register">
		        		<Register />
		        	</Route>
					<Route path="/login">
		        		<Login />
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
