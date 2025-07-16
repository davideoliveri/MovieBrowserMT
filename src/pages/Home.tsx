import React, { ReactNode, useState } from 'react'
import { Layout } from '../components/Layout';
import { Carousel } from '../components/carousel';
// TODO: remove the following interface if not needed. 
interface HomePageProps {
	isLoggedIn: string;
}

export const HomePage: React.FC<HomePageProps> = () => {
	return (
		<Layout>
			<main className='homepage'>
				<h1>Welcome back!</h1>
				<section>
					<Carousel genreName={"Horror"}></Carousel>
				</section>
				<section>
					<Carousel genreName={"Animation"}></Carousel>
				</section>
				<section>
					<Carousel genreName={"Comedy"}></Carousel>
				</section>
			</main>
		</Layout>
	)
}