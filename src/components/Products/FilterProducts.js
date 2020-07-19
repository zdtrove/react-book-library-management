import React from 'react'
import PropTypes from 'prop-types'

const FilterProducts = ({ onFilterProduct, price, onShowModalAddBook }) => {
	return (
		<div className="action-bar">
            <div className="filter">
                <input name="title" className="input-text" onChange={e => onFilterProduct(e)} type="text" placeholder="Search..." />
                <div className="price">
                    <p>$ {price}</p>
                    <input type="range" name="price" onChange={e => onFilterProduct(e)} className="filterPrice" min="100" max="1000"></input>
                </div>
            </div>
            <button onClick={onShowModalAddBook} className="button-products" type="button">Add book</button>
        </div>
	)
}

FilterProducts.propTypes = {
	onFilterProduct: PropTypes.func.isRequired,
	price: PropTypes.number.isRequired,
	onShowModalAddBook: PropTypes.func.isRequired
}

export default FilterProducts