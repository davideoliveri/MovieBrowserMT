import { genreClasses } from '../enums/genresClasses';

type genreKeys = keyof typeof genreClasses;

export interface GenreInterface {
  id: number;
  name: genreKeys;
}
