import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../features/slices/userSlice';

const Signup = () => {
  const { activationLink } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responceMessage, setResponceMessage] = useState('');
  const [isClicked, setIsClicked] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('password: ', password);
    console.log('activationKey: ', activationLink);
    axios
      .post('/api/auth/register', {
        password: password,
        activationKey: activationLink,
      })
      .then((res) => {
        setIsClicked(true)
        dispatch(setUser(res.data.user));
        navigate('/welcome', { replace: true });
      })
      .catch((err) => {
        setResponceMessage(err)
        setIsClicked(true)
      });
  };

  return (
    <div>
      <p>Signup</p>
      <div className="login-container">
        <br />
        <br />
        <TextField
          id="outlined-password-input"
          label="Password"
          variant="outlined"
          autoComplete="current-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <br />
        <Button onClick={handleSubmit} variant="contained" disabled={isClicked}>
          Sign up here
        </Button>
        <Typography variant="h4" align="center">{responceMessage}</Typography>

      </div>
    </div>
  );
};

export default Signup;
