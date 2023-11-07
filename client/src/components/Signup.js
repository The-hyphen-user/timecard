import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activationKey, setActivationKey] = useState(activationLink);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('🧱USERNAME: ', username);
    console.log('password: ', password);
    console.log('activationKey: ', activationKey);
    axios
      .post('/api/auth/register', {
        username: username,
        password: password,
        activationKey: activationKey,
      })
      .then((res) => {
        console.log(res);

        dispatch(setUser(res.data.user));

        navigate('/welcome', { replace: true });

        console.log('second res', res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>Signup</p>
      <div className="login-container">
        <TextField
          label="username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
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
        <Button onClick={handleSubmit} variant="contained">
          Log In here
        </Button>
      </div>
    </div>
  );
};

export default Signup;
