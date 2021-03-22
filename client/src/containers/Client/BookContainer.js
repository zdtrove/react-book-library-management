import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as bookActions from '../../redux/books/bookActions'
import * as uiActions from '../../redux/ui/uiActions'
import BookItem from '../../components/Client/BookItem'
import ContentModalAdd from '../../components/Modal/ContentModalAdd'
import { bindActionCreators } from 'redux'
import Pagination from 'rc-pagination';
import { PER_PAGE } from '../../constants'
import FilterBook from '../../components/Client/FilterBook'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const BookContainer = ({
    uiActionCreators,
    bookActionCreators,
    books,
    isLoading,
    totalBooks,
    currentPage
}) => {
    const { showModal, hideModal, changeModalContent } = uiActionCreators
    const { getBooks, addToCart, deleteBook, addBook, editBook, filterBooks } = bookActionCreators
    useEffect(() => {
        getBooks()
    }, [getBooks])

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
            filterBooks(searchParam)
        }
    }, [filterBooks, searchParam])

    const renderBooks = () => {
        let listBooks = null
        listBooks = books.length === 0 ? <div className="no-book">no book matched</div>
            : <TransitionGroup className="wrap-books">
                {books.map(book => {
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
        return listBooks
    }

    const onPaginate = page => {
        getBooks(searchParam, page)
    }

    const onChangeCategory = categories => {
        getBooks(searchParam, 1, categories)
    }
    return (
        <section className="books">
            <div className="section-title">
                <h2>our books</h2>
            </div>
            <FilterBook price={parseInt(price)} onFilterBook={onFilterBook} onShowModalAddBook={onShowModalAddBook} />
            <div className="book-categories">
                <button onClick={() => onChangeCategory('Category 1')}>Category 1</button>
                <button onClick={() => onChangeCategory('Category 2')}>Category 2</button>
                <button onClick={() => onChangeCategory('Category 3')}>Category 3</button>
            </div>
            <div className="books-center">
                {isLoading ? <div className="wrap-loader"><span className="loader"></span></div> : renderBooks()}
            </div>
            <div className="pagination">
                {books.length > 0 && <Pagination
                    total={totalBooks}
                    defaultPageSize={PER_PAGE}
                    onChange={onPaginate}
                    current={currentPage}
                />}
            </div>
        </section>
    )
}

BookContainer.propTypes = {
    books: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    uiActionCreators: PropTypes.shape({
        hideModal: PropTypes.func.isRequired,
        changeModalContent: PropTypes.func.isRequired,
    }),
    bookActionCreators: PropTypes.shape({
        addToCart: PropTypes.func.isRequired,
        getBooks: PropTypes.func.isRequired,
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
    books: state.books.books,
    totalBooks: state.books.totalBooks,
    currentPage: state.books.currentPage
})

const mapDispatchToProps = dispatch => ({
    uiActionCreators: bindActionCreators(uiActions, dispatch),
    bookActionCreators: bindActionCreators(bookActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BookContainer)
