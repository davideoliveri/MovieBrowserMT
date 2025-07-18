import { CastMember } from './CastMemberInterface'
import { MovieDetailsData } from './MovieDetailsDataInterface'

/** Combines the API data plus the dateAdded metadata */
export interface WishlistMovie extends MovieDetailsData {
  /** guaranteed on these objects */
  dateAdded: number 
}