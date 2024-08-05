import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.json';
import { AppBar, Toolbar, Typography, Container, Card, CardMedia, CardContent, Grid, Box, Button, TextField, IconButton, Hidden } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/user/userSlice';
import { addFavorite, removeFavorite} from '../features/favorites/favoritesSlice';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { RootState, AppDispatch } from '../app/store';
import { Movie } from '../utils/Interfaces';

const Home: React.FC = () => {
  const data: Movie[] = api as Movie[];
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const Validation = useSelector((state: RootState) => state.user.currentUser);
  // const favorites = useSelector(selectFavorites);
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  console.log("favorites",favorites);

  const handleCardClick = (id: string) => {
    if (Validation) {
      navigate(`/details/${id}`);
    } else {  
      alert("Please Login");
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddFavorite = (movie: Movie) => {
    if (Validation) {
      dispatch(addFavorite(movie));
    } else {
      alert("Please Login");
    }
  };

  const handleRemoveFavorite = (movie: Movie) => {
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    dispatch(removeFavorite(updatedFavorites));
  };

  const filteredData = data.filter(movie =>
    movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container style={{ minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: 'white' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{
            fontSize: { xs: '25px', sm: '30px', md: '35px' },
            fontFamily: "cursive",
            color: 'red',
            fontWeight: 'bold',
            margin: { xs: '10px 0', md: '0' }
          }}>
            MovieFlix
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <TextField
              label="Search Movies"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              sx={{ width: { xs: '100%', sm: 'auto' }, marginRight: '10px' }}
            />
            {Validation ? (
              <>
                <Hidden smDown>
                  <Button variant="contained" sx={{
                    backgroundColor: '#ff9800',
                    color: 'black',
                    fontWeight: 'bold',
                    width: { xs: '100%', sm: 'auto' },
                  }} onClick={() => dispatch(logout())}>
                    Logout
                  </Button>
                </Hidden>
                <Hidden smUp>
                  <IconButton onClick={() => dispatch(logout())} color="inherit">
                    <LogoutIcon />
                  </IconButton>
                </Hidden>
              </>
            ) : (
              <>
                <Hidden smDown>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button variant="contained" sx={{
                      backgroundColor: '#ff9800',
                      color: 'black',
                      fontWeight: 'bold',
                      width: { xs: '100%', sm: 'auto' },
                    }} onClick={() => navigate('/login')}>
                      Login
                    </Button>
                    <Button variant="contained" sx={{
                      backgroundColor: '#ff9800',
                      color: 'black',
                      fontWeight: 'bold',
                      width: { xs: '100%', sm: 'auto' },
                    }} onClick={() => navigate('/register')}>
                      Register
                    </Button>
                  </Box>
                </Hidden>
                <Hidden smUp>
                  <IconButton onClick={() => navigate('/login')} color="inherit">
                    <LoginIcon />
                  </IconButton>
                  <IconButton onClick={() => navigate('/register')} color="inherit">
                    <PersonAddIcon />
                  </IconButton>
                </Hidden>
              </>
            )}
            <Button variant="text" onClick={() => navigate('/favorites')}>
              <FavoriteIcon fontSize='large' />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        <Grid container spacing={3}>
          {filteredData.length > 0 ? (
            filteredData.map((movie, index) => (
              <Grid item xs={12} key={index}>
                <Card elevation={3} style={{ display: 'flex', flexDirection: 'row', minHeight: '250px' }} onClick={() => handleCardClick(movie.imdbID)}>
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
                          objectFit: 'contain',
                          borderTopLeftRadius: '10px',
                          borderTopRightRadius: '10px',
                          minWidth: '250px'
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <CardContent>
                        <Typography variant="h5" component="div" sx={{
                          fontWeight: 'bold',
                          color: 'red',
                          fontSize: { xs: '18px', sm: '24px', md: '28px' }
                        }}>
                          {movie.Title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {movie.Year} | {movie.Rated} | {movie.Runtime}
                        </Typography>
                        <Box mt={2}>
                          <Typography variant="body1">
                            <strong>Genre:</strong> {movie.Genre}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Director:</strong> {movie.Director}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Actors:</strong> {movie.Actors}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Description:</strong> {movie.Plot}
                          </Typography>
                        </Box>
                        <Box mt={2}>
                          <Typography variant="body1">
                            <strong>IMDB Rating:</strong> {movie.imdbRating} ({movie.imdbVotes} votes)
                          </Typography>
                        </Box>
                        {!favorites.some(favorite => favorite.imdbID === movie.imdbID) ? (
                          <Button variant="contained" sx={{ marginTop: '20px', backgroundColor: 'brown' }} onClick={(e) => {
                            e.stopPropagation();
                            handleAddFavorite(movie);
                          }}>Add to Favorite</Button>
                        ) : (
                          <Button variant="contained" sx={{ marginTop: '20px', backgroundColor: 'brown' }} onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(movie);
                          }}>Remove from Favorite</Button>
                        )}
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant='h6' color="textSecondary" align='center' sx={{ margin: '30px' }}>
              No movies found.
            </Typography>
          )}
        </Grid>
      </Container>
    </Container>
  );
}

export default Home;