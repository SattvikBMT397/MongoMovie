
  export interface Comment {
   
    userId: number;
 username: string;
    comment: string;
    rating: number;
    imdbID: string ;
  }
  
  export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: { Source: string; Value: string }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
  }

  export interface User {
    email: string;
    password: string;
  }
  
  export interface UserState {
    currentUser: User | null;
  }
  
  export interface FavoritesState {
    favorites: Movie[];
  }
  export interface MovieName{
    Movie:String
  }
  
export interface IFormInput {
  username: string;
  email: string;
  password: string;
}