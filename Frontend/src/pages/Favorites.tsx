import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { fetchFavorites, removeFavorite } from '../features/favorites/favoritesSlice';
import { RootState } from '../app/store';
import { Movie } from '../utils/Interfaces';
import api from '../utils/api.json';

function Favorites() {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dispatch = useDispatch();
  const favImdbIDs = favorites.map((fav) => fav.imdbID); 
  const userId = localStorage.getItem('Id') || ''; 

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId));
    }
  }, [dispatch, userId]);

  const handleRemoveFavorite = async (movie: Movie) => {
    if (userId) {
      try {
        await dispatch(removeFavorite({ imdbID: movie.imdbID })).unwrap(); 
        dispatch(fetchFavorites(userId)); 
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
    }
  };

  // Filter the movies from the JSON file that are in the favorites list
  const favoriteMovies = api.filter((movie) =>
    favImdbIDs.includes(movie.imdbID)
  );

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>
        My Favorite Movies
      </Typography>
      <Grid container spacing={3}>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie, index) => (
            <Grid item xs={12} key={index}>
              <Card elevation={3} style={{ display: 'flex', flexDirection: 'row', minHeight: '250px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <CardMedia
                      component="img"
                      alt={movie.Title}
                      height="400"
                      image={movie.Poster}
                      title={movie.Title}
                      sx={{
                        width: '100%',
                        maxHeight: 700,
                        objectFit: 'cover',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        minWidth: '250px'
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <CardContent>
                      <Typography variant="h5" component="div" style={{
                        fontWeight: 'bold',
                        color: 'red'
                      }}>
                        {movie.Title}
                      </Typography>
                      <Typography variant="subtitle1" color="textSecondary">
                        {movie.Year} | {movie.Rated} | {movie.Runtime}
                      </Typography>
                      <Button variant="contained" style={{ marginTop: '20px', backgroundColor: 'red' }} onClick={() => handleRemoveFavorite(movie)}>
                        Remove from Favorites
                      </Button>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant='h6' color="textSecondary" align='center' sx={{ margin: '30px' }}>
            No favorite movies found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Favorites;
