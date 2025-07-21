import React, { ReactNode, useState } from 'react'
import { Layout } from '../components/Layout';
import { Carousel } from '../components/carousel';

export const HomePage: React.FC = () => {
	return (
		<Layout>
			<main className='homepage container'>
				<h1 className="h1 text-center">Welcome back!</h1>
				<Carousel genreName={"Science Fiction"}></Carousel>
				<Carousel genreName={"Horror"}></Carousel>
				<Carousel genreName={"Animation"}></Carousel>
			</main>
		</Layout>
	)
}