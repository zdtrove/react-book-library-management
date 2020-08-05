import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FaHome, FaCartPlus, FaSignInAlt, FaSignOutAlt, FaEdit } from 'react-icons/fa'
import { Link, withRouter } from 'react-router-dom'

const Navbar = ({ listCart, showCart, logout, isAuthenticated, history }) => {
	const renderNavbar = () => {
		return isAuthenticated ? (
			<Fragment>
				<span className="nav-icon wrap-tooltip">
					<span className="tooltip">Logout</span>
					<FaSignOutAlt onClick={logout} />
				</span>
			</Fragment>
		) : (
			<Fragment>
				<span className="nav-icon wrap-tooltip">
					<span className="tooltip">Login</span>
					<Link to="login"><FaSignInAlt /></Link>
				</span>
				<span className="nav-icon wrap-tooltip">
					<span className="tooltip">Register</span>
					<Link to="register"><FaEdit /></Link>
				</span>
			</Fragment>
		)
	}
	return <nav className="navbar">
		<div className="navbar-center">
			<Link to="/">
				<span className="nav-icon wrap-tooltip">
					<span className="tooltip">Home</span>
					<FaHome />
				</span>
			</Link>
			<p className="logo">Book <span>Store</span></p>
			<div className="list-action">
				<div onClick={showCart} className="cart-btn">
					<span className="nav-icon wrap-tooltip">
						<span className="tooltip">Cart</span>
						<FaCartPlus />
					</span>
					<div className="cart-items">{listCart && listCart.length}</div>
				</div>
				{renderNavbar()}
			</div>
		</div>
	</nav>
}

Navbar.propTypes = {
	showCart: PropTypes.func.isRequired,
	listCart: PropTypes.array.isRequired,
	logout: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool.isRequired
}

export default withRouter(Navbar)