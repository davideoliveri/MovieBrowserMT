import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { HomePage } from './pages/Home'
import { MovieDetails } from './pages/MovieDetails';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage isLoggedIn='true' />} />
				<Route path="moviedetails/:id" element={<MovieDetails />} />
			</Routes>
		</BrowserRouter>
	)
}