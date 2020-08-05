import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as booksActions from '../../redux/books/booksActions'
import * as uiActions from '../../redux/ui/uiActions'
import BookItem from '../../components/Books/BookItem'
import ContentModalAdd from '../../components/Modal/ContentModalAdd'
import { bindActionCreators } from 'redux'
import Pagination from 'rc-pagination';
import { PER_PAGE } from '../../constants'
import FilterBooks from '../../components/Books/FilterBooks'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const BooksContainer = ({
    uiActionCreators,
    booksActionCreators,
    listBooks,
    isLoading,
    totalBooks,
    currentPage
}) => {
    const { showModal, hideModal, changeModalContent } = uiActionCreators
    const { loadBooks, addToCart, deleteBook, addBook, editBook, filterBooks } = booksActionCreators
    useEffect(() => {
        loadBooks()
    }, [loadBooks])

    const onShowModalAddBook = () => {
        showModal()
        changeModalContent(<ContentModalAdd
            changeModalContent={changeModalContent}
            hideModal={hideModal}
            addBook={addBook}
        />)
    }

    const [price, setPrice] = useState(100)
    const [searchParam, setSearchParam] = useState({
        title: null,
        price: null
    })

    const onFilterBook = async e => {
        const { name, value } = e.target
        setSearchParam({
            ...searchParam,
            [name]: value
        })
        if (name === 'price') {
            setPrice(value)
        }
    }

    useEffect(() => {
        if (searchParam.title !== null || searchParam.price !== null) {
            console.log(searchParam)
            filterBooks(searchParam)
        }
    }, [filterBooks, searchParam])

    const renderBooks = () => {
        let books = null
        books = listBooks.length === 0 ? <div className="no-book">no book matched</div>
            : <TransitionGroup className="wrap-books">
                {listBooks.map(book => {
                    return <CSSTransition classNames="item" timeout={600} key={book._id}>
                        <BookItem
                            book={book}
                            addToCart={addToCart}
                            showModal={showModal}
                            hideModal={hideModal}
                            changeModalContent={changeModalContent}
                            deleteBook={deleteBook}
                            editBook={editBook}
                        />
                    </CSSTransition>
                })}
            </TransitionGroup>
        return books
    }

    const onPaginate = page => {
        loadBooks(searchParam, page)
    }
    return (
        <section className="books">
            <div className="section-title">
                <h2>our books</h2>
            </div>
            <FilterBooks price={parseInt(price)} onFilterBook={onFilterBook} onShowModalAddBook={onShowModalAddBook} />
            <div className="books-center">
                {isLoading ? <div className="wrap-loader"><span className="loader"></span></div> : renderBooks()}
            </div>
            <div className="pagination">
                {listBooks.length > 0 && <Pagination
                    total={totalBooks}
                    defaultPageSize={PER_PAGE}
                    onChange={onPaginate}
                    current={currentPage}
                />}
            </div>
        </section>
    )
}

BooksContainer.propTypes = {
    listBooks: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    uiActionCreators: PropTypes.shape({
        hideModal: PropTypes.func.isRequired,
        changeModalContent: PropTypes.func.isRequired,
    }),
    booksActionCreators: PropTypes.shape({
        addToCart: PropTypes.func.isRequired,
        loadBooks: PropTypes.func.isRequired,
        filterBooks: PropTypes.func.isRequired,
        addBook: PropTypes.func.isRequired,
        deleteBook: PropTypes.func.isRequired,
        editBook: PropTypes.func.isRequired
    }),
    totalBooks: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    isLoading: state.ui.isLoading,
    listBooks: state.books.listBooks,
    totalBooks: state.books.totalBooks,
    currentPage: state.books.currentPage
})

const mapDispatchToProps = dispatch => ({
    uiActionCreators: bindActionCreators(uiActions, dispatch),
    booksActionCreators: bindActionCreators(booksActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BooksContainer)
