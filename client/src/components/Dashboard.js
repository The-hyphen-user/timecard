import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Grid, Paper, Typography, Container } from '@mui/material';

import TimecardCreatePage from './TimecardCreatePage'
import JobsiteSearchPage from './JobsiteSearchPage'
import JobsiteCard from './JobsiteCard';
import TimecardsByJobsiteId from './TimecardsByJobsiteId';

import axios from "axios";

const Dashboard = () => {

    let navigate = useNavigate();
    const selectedJobsite = useSelector((state) => state.jobsites.selectedJobsite)
    const username = useSelector((state) => state.user.user.username);
    // const recentTimecards = useSelector((state) => state.recentTimecards.recentTimecards.recentTimecards);
    const [selectedButton, setSelectedButton] = React.useState(null);
    const [recentTimecards, setRecentTimecards] = useState([]);

    useEffect(() => {
        axios.get('/api/timecards/recent')
            .then((res) => {
                // setRecentTimecards(res.data);
                console.log('timecards pull', res.data);
            })
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
        <Grid container spacing={2} >
            
            <Grid item xs={12} >
            <Typography variant="h4" style={{ marginTop: '20px' }}>
                Welcome, {username}!, dashboard
            </Typography>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
        <TimecardCreatePage />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
        <JobsiteSearchPage />
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
            <Typography variant="h4">selected jobsite then timecards</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {selectedJobsite ? 'selectedJobsite' : 'null is null'}
            <JobsiteCard jobsite={selectedJobsite} isSelectable={false} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>
              Timecards for {selectedJobsite.name}
            </Typography>
            <TimecardsByJobsiteId />
          </Grid>
        </Grid>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
            </Grid>

        </Grid>
    );
};

export default Dashboard;

/*
                    
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
*/