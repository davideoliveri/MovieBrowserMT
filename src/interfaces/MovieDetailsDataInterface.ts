import { genreClasses } from "../enums/genresClasses"
import { CastMember } from "./CastMemberInterface"
	

type genreKeys = keyof typeof genreClasses;
interface GenreInterface {
	id: number
	name: genreKeys
}

export interface MovieDetailsData {
	id: number
	title: string
	overview?: string
	poster_path: string | null
	release_date: string
	vote_average: number
	runtime?: number
	credits?: { cast: CastMember[] }
	dateAdded?: number
	genres?: GenreInterface[]
}