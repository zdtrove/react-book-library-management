import React from 'react'
import PropTypes from 'prop-types'

const FilterBooks = ({ onFilterBook, price, onShowModalAddBook }) => {
	return (
		<div className="filter-bar">
            <div className="filter">
                <input name="title" className="ipt" onChange={e => onFilterBook(e)} type="text" placeholder="Search..." />
                <div className="price">
                    <p>$ {price}</p>
                    <input type="range" name="price" onChange={e => onFilterBook(e)} className="filterPrice" min="100" max="1000"></input>
                </div>
            </div>
            <button onClick={onShowModalAddBook} className="btn" type="button">Add book</button>
        </div>
	)
}

FilterBooks.propTypes = {
	onFilterBook: PropTypes.func.isRequired,
	price: PropTypes.number.isRequired,
	onShowModalAddBook: PropTypes.func.isRequired
}

export default FilterBooks