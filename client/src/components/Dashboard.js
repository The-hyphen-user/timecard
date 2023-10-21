import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link, Outlet, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';
import { useSelector } from "react-redux";

const Dashboard = () => {

    let navigate = useNavigate();
    const username = useSelector((state) => state.user.user.username);
    // const recentTimecards = useSelector((state) => state.recentTimecards.recentTimecards.recentTimecards);
    const [selectedButton, setSelectedButton] = React.useState(null);


    useEffect(() => {
        if (username == null) {
            navigate('/login', { replace: true });
        }
    }, [username]);

    const handleButtonChange = (event, newSelectedButton) => {
        setSelectedButton(newSelectedButton);
    };
    const handleJobsite = () => {
        navigate('/jobsites', { replace: true });
    }
    const handleTimecardSearch = () => {
        navigate('/timecardsearch', { replace: true });
    }

    return (
        <Container maxWidth="lg" style={{ paddingLeft: '35px', paddingRight: '35px' }}>

            <Grid container spacing={3} style={{ padding: '20px' }}>
                {/* Left Panel */}
                <Grid item xs={3}>
                    <Button onClick={handleJobsite} variant="contained" color="primary" fullWidth style={{ marginBottom: '10px' }}>
                        Jobsites
                    </Button>
                    <ButtonGroup
                        value={selectedButton}
                        exclusive
                        onChange={handleButtonChange}
                        variant="contained" color="primary"
                        aria-label="text alignment"
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        <Button onClick={handleTimecardSearch} value="search" aria-label="left-aligned">
                            Search Timecards
                        </Button>
                        <Button value="new" aria-label="centered">
                            Add New Timecard
                        </Button>
                    </ButtonGroup>
                </Grid>

                {/* Right Panel */}
                <Grid item xs={9}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h6" gutterBottom>
                            Message of the Day
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            Insert your message here...
                        </Typography>
                    </Paper>

                    <Typography variant="h6" style={{ marginTop: '20px' }}>
                        Recent Timecards
                    </Typography>

                    {/* Recent Timecard Paper Cards */}
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
                        {/* Content for Timecard 1 */}
                    </Paper>
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
                        {/* Content for Timecard 2 */}
                    </Paper>
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
                        {/* Content for Timecard 3 */}
                    </Paper>
                    { }
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;