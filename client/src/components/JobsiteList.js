import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import JobsiteCard from './JobsiteCard';
import axios from "axios";

const JobsiteList = () => {
    const [jobsites, setJobsites] = useState([])
    useEffect(() => {
        axios.get('/api/jobsite/recent')
        .then((res) => {
            setJobsites(res.data)
            console.log(res.data)
        })

    },[])

    const exampleJobsites = [
        {
            id: 1,
            name: 'Construction Site A',
            address: '123 Main St, Cityville, State, 12345',
            pictureLink: 'https://cardinal-construct.com/wp-content/uploads/2021/01/Exterior_spiral_sraircase-1.jpg',
            isAdmin: true,
            totalManHours: 2000,
            estimatedEndDate: '2023-12-31',
        },
        {
            id: 2,
            name: 'Office Building B',
            address: '456 Elm St, Townsville, State, 67890',
            pictureLink: 'https://cardinal-construct.com/wp-content/uploads/2021/01/Exterior_paint_siding_before-1.jpg',
            isAdmin: false,
        }
    ];
    return (
        <div>
            <Container maxWidth="lg" style={{ paddingLeft: '35px', paddingRight: '35px' }}>
                <Grid container spacing={3} style={{ padding: '20px' }}>
                    {jobsites.map((jobsite) => (
                        <Grid item xs={12} md={6} lg={4} key={jobsite._id}>
                            <Link to={`/jobsite/${jobsite._id}`} style={{ textDecoration: 'none' }}>
                                <Paper style={{ padding: '20px', cursor: 'pointer' }}>
                                    <JobsiteCard {...jobsite} />
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default JobsiteList;


