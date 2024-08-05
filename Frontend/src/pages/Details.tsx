import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Paper,
  Grid,
  CardMedia,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
} from '@mui/material';
import { Comment, Movie } from '../utils/Interfaces';
import api from '../utils/api.json';

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const movie = api.find((movie: Movie) => movie.imdbID === id);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number | ''>('');
  const userId = localStorage.getItem('Id');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/comments/${id}`);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    fetchComments();
  }, [id]);

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => setNewComment(e.target.value);
  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => setNewRating(Number(e.target.value));

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment && newRating !== '') {
      const commentData = { userId, comment: newComment, rating: newRating, imdbID: id as string };
      try {
        await axiosInstance.post('/comments/add', commentData);
        setNewComment('');
        setNewRating('');
        const response = await axiosInstance.get(`/comments/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
    }
  };

  const movieComments = comments?.filter(comment => comment.imdbID === id);
  console.log(movieComments);

  return (
    <div style={{ backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <AppBar position="static" style={{ backgroundColor: 'white' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="h6"
            style={{
              fontSize: '35px',
              fontFamily: 'cursive',
              color: 'red',
              fontWeight: 'bold',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            MovieFlix
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px', padding: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                alt={movie?.Title}
                height="auto"
                image={movie?.Poster}
                title={movie?.Title}
                sx={{
                  width: '100%',
                  maxHeight: 700,
                  objectFit: 'contain',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="div" style={{ color: 'red', marginBottom: '10px' }}>
                {movie?.Title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                {movie?.Year} | {movie?.Rated} | {movie?.Runtime}
              </Typography>
              <Typography variant="body1">
                <strong>Genre:</strong> {movie?.Genre}
              </Typography>
              <Typography variant="body1">
                <strong>Director:</strong> {movie?.Director}
              </Typography>
              <Typography variant="body1">
                <strong>Actors:</strong> {movie?.Actors}
              </Typography>
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                <strong>Description:</strong> {movie?.Plot}
              </Typography>
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                <strong>IMDB Rating:</strong> {movie?.imdbRating} ({movie?.imdbVotes} votes)
              </Typography>
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                <strong>Awards:</strong> {movie?.Awards}
              </Typography>
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                <strong>Available in Languages:</strong> {movie?.Language}
              </Typography>
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                <strong>Production & Votes:</strong> {movie?.Production} ({movie?.BoxOffice} votes)
              </Typography>
            </Grid>
          </Grid>
          <Box mt={4}>
            <Typography variant="h5" component="div" style={{ marginBottom: '10px' }}>
              Comments and Ratings
            </Typography>
            <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <TextField
                label="Rating"
                variant="outlined"
                value={newRating}
                onChange={handleRatingChange}
                type="number"
                inputProps={{ min: 0, max: 10 }}
                required
              />
              <TextField
                label="Comment"
                variant="outlined"
                multiline
                rows={4}
                value={newComment}
                onChange={handleCommentChange}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
            <List style={{ marginTop: '20px' }}>
              {movieComments?.map((comment, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>{comment.user_id.username ? comment.user_id.username[0].toUpperCase() : '?'}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${comment.user_id.username} - Rating: ${comment.rating}`}
                      secondary={comment.comment}
                    />
                  </ListItem>
                  {index < movieComments.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Details;
