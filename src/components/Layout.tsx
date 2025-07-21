import { Header } from './common/Header'
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