import React from 'react'
import { connect } from 'react-redux'
import AdminBooks from '../../components/Admin/AdminBooks'

const AdminBookContainer = ({
    books,
    uiActionCreators,
    bookActionCreators,
    startLoadMore,
    totalBooks,
}) => {

    return <>
        <AdminBooks
            books={books}
            startLoadMore={startLoadMore}
            totalBooks={totalBooks}
            bookActionCreators={bookActionCreators}
            uiActionCreators={uiActionCreators}
        />
    </>
}

const mapStateToProps = state => ({
    books: state.books.books,
    startLoadMore: state.books.startLoadMore,
    totalBooks: state.books.totalBooks
})

export default connect(mapStateToProps, null)(AdminBookContainer)