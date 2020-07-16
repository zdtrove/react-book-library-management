import React from 'react'
import PropTypes from 'prop-types'
import { FaBars, FaCartPlus } from 'react-icons/fa'

const Navbar = ({ listCart, showCart }) => {
	return <nav className="navbar">
		<div className="navbar-center">
			<span className="nav-icon">
				<FaBars />
			</span>
			<p className="logo">Book <span>Store</span></p>
			<div onClick={showCart} className="cart-btn">
				<span className="nav-icon">
					<FaCartPlus />
				</span>
				<div className="cart-items">{listCart && listCart.length}</div>
			</div>
		</div>
	</nav>
}

Navbar.propTypes = {
	showCart: PropTypes.func.isRequired,
	listCart: PropTypes.array.isRequired
}

export default Navbar