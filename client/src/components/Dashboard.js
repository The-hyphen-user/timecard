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

import Timecard from './TimecardPage';

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
    const ExampleTimecardData = {
        id: 1,
        userId: 123,
        jobSiteName: 'Twelth Street',
        date: '2023-10-21',
        hours: 8,
        tasks: 'Completed tasks A, B, and C',
        recorded: true,
        username: 'John Doe'
    };

    return (
        <Container maxWidth="lg" style={{ paddingLeft: '35px', paddingRight: '35px' }}>

            <Grid container spacing={3} style={{ padding: '20px' }}>

                {/* Right Panel */}
                <Grid item xs={12}>
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
                        <Timecard
                            id={ExampleTimecardData.id}
                            userId={ExampleTimecardData.userId}
                            jobSiteName={ExampleTimecardData.jobSiteName}
                            date={ExampleTimecardData.date}
                            hours={ExampleTimecardData.hours}
                            tasks={ExampleTimecardData.tasks}
                            recorded={ExampleTimecardData.recorded}
                            username={ExampleTimecardData.username}
                        />
                    </Paper>
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
                        {/* Content for Timecard 2 */}
                        <Timecard
                            id={ExampleTimecardData.id}
                            userId={ExampleTimecardData.userId}
                            jobSiteName={ExampleTimecardData.jobSiteName}
                            date={ExampleTimecardData.date}
                            hours={ExampleTimecardData.hours}
                            tasks={ExampleTimecardData.tasks}
                            recorded={ExampleTimecardData.recorded}
                            username={ExampleTimecardData.username}
                        />
                    </Paper>
                    <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
                        {/* Content for Timecard 3 */}
                        <Timecard
                            id={ExampleTimecardData.id}
                            userId={ExampleTimecardData.userId}
                            jobSiteName={ExampleTimecardData.jobSiteName}
                            date={ExampleTimecardData.date}
                            hours={ExampleTimecardData.hours}
                            tasks={ExampleTimecardData.tasks}
                            recorded={ExampleTimecardData.recorded}
                            username={ExampleTimecardData.username}
                        />
                    </Paper>
                    { }
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
