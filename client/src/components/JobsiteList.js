import React, { useEffect, useState } from 'react';

import {
  Button,
  Grid,
  TextField,
  Container,
  Typography,
  Paper,
} from '@mui/material';
import JobsiteCard from './JobsiteCard';
import axios from 'axios';

const JobsiteList = () => {
  const [jobsites, setJobsites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuantity, setSearchQuantity] = useState(5);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (jobsites.length === 0) {
      axios
        .get('/api/jobsite/recenttoall', {
          params: {
            searchQuantity: searchQuantity,
          },
        })
        .then((res) => {
          setJobsites(res.data.jobsites);
          console.log(res.data.jobsites);
        });
    }
  }, []);
  const handleRecent = () => {
    axios
      .get('/api/jobsite/recenttoall', {
        params: {
          searchQuantity: searchQuantity,
        },
      })
      .then((res) => {
        setJobsites(res.data);
        console.log(res.data);
      });
  };
  const handleSearch = () => {
    console.log('searching', searchTerm, searchQuantity);
    axios
      .get('/api/jobsite/search', {
        params: {
          searchTerm: searchTerm,
          searchQuantity: 50,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSearchResults(res.data.jobsites);
      });
  };

  return (
    <div>
      <Container
        maxWidth="lg"
        style={{ paddingLeft: '35px', paddingRight: '35px' }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Jobsites
        </Typography>
        <Container
          maxWidth="lg"
          style={{ paddingLeft: '35px', paddingRight: '35px' }}
        >
          <TextField
            label="Search Jobsites"
            variant="outlined"
            color="primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSearch()}
          >
            Search
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRecent()}
          >
            recent
          </Button>
        </Container>

        <Grid container spacing={3} style={{ padding: '20px' }}>
          {searchResults.map((jobsite) => (
            <Grid item xs={12} md={6} lg={4} key={jobsite._id}>
              <Paper style={{ padding: '20px', cursor: 'pointer' }}>
                <JobsiteCard
                  key={jobsite._id}
                  jobsite={jobsite}
                  isLinkable={false}
                  isSelectable={false}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default JobsiteList;
