import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as uiActions from '../../redux/ui/uiActions'
import * as bookActions from '../../redux/books/bookActions'
import Cart from '../../components/Client/Cart'

const CartContainer = ({
    listCart,
    totalPrice,
    isShowCart,
    uiActionCreators,
    bookActionCreator,
    hideCart,
}) => {
    return <>
        <Cart 
            listCart={listCart}
            totalPrice={totalPrice}
            isShowCart={isShowCart}
            uiActionCreators={uiActionCreators}
            bookActionCreator={bookActionCreator}
            hideCart={hideCart}
        />
    </>
}

const mapStateToProps = state => ({
    listCart: state.books.listCart,
    totalPrice: state.books.totalPrice,
    isShowCart: state.ui.isShowCart
})

const mapDispatchToProps = dispatch => ({
    uiActionCreators: bindActionCreators(uiActions, dispatch),
    bookActionCreator: bindActionCreators(bookActions, dispatch),
    hideCart: () => dispatch(uiActions.hideCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)