import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography, ToggleButtonGroup } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Createactivation = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/activation/createactivation', {
        email,
        username,
        role,
      })
      .then((res) => {
        console.log('id', res.data.activationKey);
        navigate(`/signup/${res.data.activationKey}`);
      });
  };
  const setToUser = () => {
    setRole('user')
  }
  const setToAdmin = () => {
    setRole('admin')
  }
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create Activation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </Grid>
        <Grid item xs={12}>
          <ToggleButtonGroup
            color="primary"
            variant="solid"
            exclusive
            value={role}>
            <Button
              variant="contained"
              onClick={setToUser}
              sx={{
                background:
                  role === 'user' ? 'primary' : 'lightgrey',
              }}>User</Button>
            <Button
              variant="contained"
              onClick={setToAdmin}
              sx={{
                background:
                  role === 'admin' ? 'primary' : 'lightgrey',
              }}>Admin</Button>

          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Createactivation;
