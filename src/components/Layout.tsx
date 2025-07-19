import React, { Children } from 'react'
import { Link } from 'react-router-dom'
import { Header } from './common/header'
import { Footer } from './common/Footer'

interface LayoutProps {
	children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }): React.ReactNode => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}