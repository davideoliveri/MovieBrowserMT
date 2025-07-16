import React, { Children } from 'react'
import { Link } from 'react-router-dom'

interface LayoutProps {
	children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }): React.ReactNode => {
	return (
		<>
			<nav className='header'>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/movie:id">About</Link>
					</li>
					<li>
						<Link to="/wishlist">Users</Link>
					</li>
				</ul>
			</nav>

			{children}
		</>
	)
}