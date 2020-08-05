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
import Books from './pages/Books'
import Register from './pages/Register'
import CartContainer from './containers/Cart'
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<NavbarContainer />
				<Switch>
		        	<PrivateRoute exact path="/" component={Home} />
		        	<PrivateRoute path="/books" component={Books} />
		        	<Route path="/register" component={Register} />
					<Route path="/login" component={Login} />
		        </Switch>
		        <CartContainer />
				<ToastContainer />
				<ModalContainer />
			</Router>
		</Provider>
	);
}

export default App
