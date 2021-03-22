import React from 'react';
import './App.css';
import store from './redux/store'
import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Client/Home'
import RegisterContainer from './containers/Client/RegisterContainer'
import LoginContainer from './containers/Client/LoginContainer';
import LoginAdminContainer from './containers/Admin/LoginAdminContainer';
import * as authTypes from './redux/auth/authTypes';
import axios from 'axios';
import jwtDecode from 'jwt-decode'
import AdminRoute from './routes/AdminRoute'
import AdminContainer from './containers/Admin/AdminContainer';
import AdminUserContainer from './containers/Admin/AdminUserContainer'
import AdminBookContainer from './containers/Admin/AdminBookContainer'

const token = localStorage.blmToken

if (token) {
	if (jwtDecode(token).exp < (Date.now() / 1000)) {
		store.dispatch({ type: authTypes.TOKEN_EXPIRED });
	} else {
		store.dispatch({ type: authTypes.SET_AUTHENTICATED, payload: { token } });
	}
} else delete axios.defaults.headers.common['Authorization']

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/register" component={RegisterContainer} />
					<Route path="/login" component={LoginContainer} />
					<Route path="/admin/login" component={LoginAdminContainer} />
					<AdminRoute exact path="/admin" component={AdminContainer} />
					<AdminRoute exact path="/admin/users" component={AdminUserContainer} />
					<AdminRoute exact path="/admin/books" component={AdminBookContainer} />
		        </Switch>
			</Router>
		</Provider>
	);
}

export default App
