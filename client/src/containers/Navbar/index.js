import { connect } from 'react-redux'
import { showCart } from '../../redux/ui/uiActions'
import Navbar from '../../components/Navbar'

const mapStateToProps = state => ({
	listCart: state.products.listCart
})

const mapDispatchToProps = dispatch => ({
	showCart: () => dispatch(showCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)