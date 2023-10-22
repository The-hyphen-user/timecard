import React, { useState } from 'react'
import {
    TextField,
    Button,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Createactivation = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        axios.post('/api/activation/create', {
            email: email,
        })
            .then(res => {
                console.log('id', res.data.activationKey)
                navigate(`/signup/${res.data.activationKey}`)
            })
    }
    return (
        <Container maxWidth="sm" style={{ marginTop: "50px" }}>
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Createactivation