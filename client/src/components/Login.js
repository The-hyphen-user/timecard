import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { Typography, Container, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../features/slices/userSlice';
import { setRecentTimecard } from '../features/slices/timecardsSlice';
import {
  setRecentJobsitesToMe,
  setRecentJobsitesToAll,
} from '../features/slices/jobsitesSlice';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🧱USERNAME: ', username);
    axios
      .post('/api/auth/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);

        dispatch(setUser(res.data.user));
        dispatch(setRecentTimecard(res.data.recentTimecards));
        dispatch(setRecentJobsitesToMe(res.data.recentJobsites));
        dispatch(setRecentJobsitesToAll(res.data.recentToAll));
        console.log(res.data.recentTimecards);

        navigate('/dashboard', { replace: true });
      })
      .catch((err) => {
        console.log('loging error:', err);
        setError(err);
      });
  };
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '75vh' }}
    >
      <Grid item>
        <Paper
          sx={{
            padding: 2,
            margin: 'auto',
            maxWidth: '300px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4">Login</Typography>
          <TextField
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            fullWidth
            margin="normal"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            variant="outlined"
            autoComplete="current-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleSubmit} variant="contained" fullWidth>
            Log In
          </Button>
        </Paper>
      </Grid>
      <Grid item>
        {error ? (
          <>
            <Typography>{error.message}</Typography>
            <Typography>{error.name}</Typography>
            <Typography>{error.code}</Typography>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </Grid>
  );
};

export default Login;
