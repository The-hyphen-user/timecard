import axios from 'axios';
import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core';
import { Typography, Container, Grid, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const NewUser = () => {
    const { email, activationKey } = useParams()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('dsa@dsa.dsa')
    // const [activationKey, setActivationKey] = useState('')
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/api/activation/activateuser', {
                activationKey,
                email,
                username,
                password
            })
    }
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
                    <Typography variant="h4">Sign Up</Typography>
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
    )
}

export default NewUser