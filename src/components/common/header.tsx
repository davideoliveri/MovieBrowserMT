import React from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = () => {
	return <>
		<nav className='header'>
			<ul className='header__menu'>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					{/* <Link to="/movie:id">About</Link> */}
				</li>
				<li>
					<Link to="/wishlist">Wishlist</Link>
				</li>
			</ul>
		</nav></>
}