import React from 'react'

interface FooterProps {

}

export const Footer: React.FC<FooterProps> = () => {
	return (
		<footer>
			Copyright © {new Date().getFullYear()}
		</footer>
	)

}