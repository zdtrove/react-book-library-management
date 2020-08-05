import { connect } from 'react-redux'
import { showCart } from '../../redux/ui/uiActions'
import { logout } from '../../redux/auth/authActions'
import Navbar from '../../components/Navbar'

const mapStateToProps = state => ({
	listCart: state.books.listCart,
	isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = dispatch => ({
	showCart: () => dispatch(showCart()),
	logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)