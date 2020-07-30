import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	return <header className="hero">
		<div className="banner">
			<h1 className="banner-title">welcome to our store</h1>
			<button className="banner-btn">
				<Link to="products">shop now</Link>
			</button>
		</div>
	</header>
}

export default Header