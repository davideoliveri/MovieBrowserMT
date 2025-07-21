export type SortKey = 'dateAdded' | 'score' | 'releaseDate'
export type Order = 'asc' | 'desc'

export interface UseWishlistMoviesOptions {
	page?: number
	perPage?: number
	sortBy?: SortKey
	order?: Order
}