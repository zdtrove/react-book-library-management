import React from 'react'
import BookContainer from '../../containers/Client/BookContainer'
import NavbarContainer from '../../containers/Client/NavbarContainer'
import CartContainer from '../../containers/Client/CartContainer'
import ModalContainer from '../../containers/Client/ModalContainer'
import { ToastContainer } from 'react-toastify'

const Home = () => {
	return <>
        <NavbarContainer />
        <CartContainer />
        <BookContainer />
        <ToastContainer />
        <ModalContainer />
    </>
}

export default Home