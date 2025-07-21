import { Movie } from './MovieInterface';
import { CastMember } from './CastMemberInterface';
import { GenreInterface } from './GenreInterface';

export interface MovieDetailsData extends Movie {
  overview?: string;
  runtime?: number;
  credits?: { cast: CastMember[] };
  genres?: GenreInterface[];
}
