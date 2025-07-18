import { CastMember } from "./CastMemberInterface"

export interface MovieDetailsData {
	id: number
	title: string
	overview: string
	poster_path: string | null
	release_date: string
	vote_average: number
	runtime: number,
	credits: { cast: CastMember[] }
	dateAdded?: number
}