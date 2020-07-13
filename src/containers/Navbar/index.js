import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActions from '../../redux/ui/uiActions'
import Navbar from '../../components/Navbar'

const mapStateToProps = state => ({
	listCart: state.cart.listCart
})

const mapDispatchToProps = dispatch => ({
	uiActionsCreator: bindActionCreators(uiActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)