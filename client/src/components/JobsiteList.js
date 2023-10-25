import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import JobsiteCard from './JobsiteCard';
import axios from "axios";
import { Button } from "@mui/material";

const JobsiteList = () => {
    const [jobsites, setJobsites] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchQuantity, setSearchQuantity] = useState(5)
    const [previousSearchTerm, setPreviousSearchTerm] = useState('')
    const [previousSearchQuantity, setPreviousSearchQuantity] = useState(0)
    const [previosSearchResults, setPreviousSearchResults] = useState([])
    useEffect(() => {
        if (jobsites.length === 0){
        axios.get('/api/jobsite/recent',{
            params: {
                searchQuantity: searchQuantity,
            }
        })
            .then((res) => {
                setJobsites(res.data)
                console.log(res.data)
            })
        }

    }, [])
    const handleRecent = () => {
        axios.get('/api/jobsite/recent',{
            params: {
                searchQuantity: searchQuantity,
            }
        })
            .then((res) => {
                setJobsites(res.data)
                console.log(res.data)
            })
    }
    const handleSearch = () => {
        if (searchTerm === previousSearchTerm && searchQuantity <= previousSearchQuantity) {
            setJobsites(previosSearchResults.slice(0, searchQuantity))
        } else {
            console.log('searching', searchTerm, searchQuantity)
            axios.get('/api/jobsite/search', {
                params: {
                    searchTerm: searchTerm,
                    searchQuantity: searchQuantity,
                }
            })
                .then((res) => {
                    setPreviousSearchQuantity(searchQuantity)
                    setPreviousSearchTerm(searchTerm)
                    setPreviousSearchResults(res.data)
                    setJobsites(res.data)
                    console.log(res.data)
                })
        }

    }
    const handleQuantityChange = (newQuantity) => {
        setSearchQuantity(newQuantity)
        if ( newQuantity <= previousSearchQuantity){
            setJobsites(previosSearchResults.slice(0, newQuantity))
        } else {//axios request
        }
    }


    /*
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
        */
    return (
        <div>
            <Container maxWidth="lg" style={{ paddingLeft: '35px', paddingRight: '35px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Jobsites
                </Typography>
                <Container maxWidth="lg" style={{ paddingLeft: '35px', paddingRight: '35px' }}>
                    <TextField
                        label="Search Jobsites"
                        variant="outlined"
                        color='primary'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color='primary'
                        onClick={() => handleSearch()}
                    >Search</Button>
                    <Button
                        variant="contained"
                        color='primary'
                        onClick={() => handleRecent()}
                        
                    >recent</Button>
                </Container>
                <Container maxWidth="lg" style={{ paddingLeft: '35px', paddingRight: '35px' }}>
                    <Button
                        variant={searchQuantity === 5 ? "contained" : "outlined"}
                        color={previousSearchQuantity >= 5 ? "primary" : "grey"}
                        onClick={() => handleQuantityChange(5)}
                    >5</Button>
                    <Button
                        variant={searchQuantity === 10 ? "contained" : "outlined"}
                        color={previousSearchQuantity >= 10 ? "primary" : "grey"}
                        onClick={() => handleQuantityChange(10)}
                    >10</Button>
                    <Button
                        variant={searchQuantity === 20 ? "contained" : "outlined"}
                        color={previousSearchQuantity >= 20 ? "primary" : "grey"}
                        onClick={() => handleQuantityChange(20)}
                    >20</Button>



                </Container>
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





/*<Button
                    
                    variant={customButtonFocus  ? "contained" : "outlined"}
                    color='primary'
                    onClick={() => setSearchQuantity(50)}
                >{customSearchQuantity}</Button>
                * */