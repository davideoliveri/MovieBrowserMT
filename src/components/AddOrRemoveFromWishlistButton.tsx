import React, { useEffect, useState } from 'react'
import { useWishlist } from '../store/whislist'

interface addRemoveFromWishlistProps {
	movieId: number
}

export const AddRemoveFromWishlist: React.FC<addRemoveFromWishlistProps> = ({ movieId }): React.ReactNode => {
	const [isWishlisted, setIsWishlisted] = useState<boolean>(false)
	const { state: entries, dispatch } = useWishlist()

	const addRemoveFromWishlist = () => {
		console.log("adding or removing, isWishlisted = ", isWishlisted)
		if (isWishlisted) {
			console.log('dospatching')
			dispatch({ type: 'REMOVE', id: movieId })
		} else {
			dispatch({ type: 'ADD', entry: { id: movieId, dateAdded: Date.now() } })
		}
	}

	useEffect(() => {
		if (!movieId) return
		setIsWishlisted(entries.some(entry => entry.id === movieId))
	}, [movieId, entries])

	return <button onClick={addRemoveFromWishlist}>{isWishlisted ? 'Remove from' : 'Add to'} Wishlist</button>

}