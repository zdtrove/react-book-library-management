import React from 'react'
import { connect } from 'react-redux'
import { showCart } from '../../redux/ui/uiActions'
import { logout } from '../../redux/auth/authActions'
import Navbar from '../../components/Client/Navbar'

const NavbarContainer = ({ listCart, isAuthenticated, showCart, logout }) => {
    return <Navbar
        listCart={listCart}
        isAuthenticated={isAuthenticated}
        showCart={showCart}
        logout={logout}
    />
}

const mapStateToProps = state => ({
	listCart: state.books.listCart,
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
	showCart: () => dispatch(showCart()),
	logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)