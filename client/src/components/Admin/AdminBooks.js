import React, { useEffect } from 'react'
import BookItem from '../../components/Client/BookItem'

const AdminBooks = ({
    bookActionCreators,
    uiActionCreators,
    books,
    startLoadMore,
    totalBooks,
}) => {
    const { showModal, hideModal, changeModalContent } = uiActionCreators
    const { addToCart, deleteBook, editBook, loadMoreBook, getBooks } = bookActionCreators
    
    useEffect(() => {
        getBooks()
    }, [getBooks])
    
    const onChangeCategory = categories => {
        getBooks(null, 1, categories)
    }

    const renderBook = () => {
        let bookList = null;
        bookList = books.length === 0 ? <div>No books</div>
            : <div className="books-center">
            <div className="wrap-books">
                {books.map(book => {
                    return <BookItem
                        key={book._id}
                        className="item"
                        book={book}
                        addToCart={addToCart}
                        showModal={showModal}
                        hideModal={hideModal}
                        changeModalContent={changeModalContent}
                        deleteBook={deleteBook}
                        editBook={editBook}
                    />
                })}
            </div>
        </div>
        return bookList
    }

    const loadMore = () => {
        loadMoreBook(startLoadMore);
    }
    return <>
        <div className="admin-tab">
            <button>Books</button>
            <button>Users</button>
        </div>
        <br />
        <hr />
        <br />
        <div className="book-categories">
            <button onClick={() => onChangeCategory('Category 1')}>Category 1</button>
            <button onClick={() => onChangeCategory('Category 2')}>Category 2</button>
            <button onClick={() => onChangeCategory('Category 3')}>Category 3</button>
        </div>
        {renderBook()}
        {totalBooks > startLoadMore && <div className="wrap-load-more"><button onClick={loadMore}>Load more</button></div>}
    </>
}

export default AdminBooks