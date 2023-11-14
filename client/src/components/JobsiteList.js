import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import desired locale for dayjs

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
import { DateRange } from 'react-date-range';

const JobsiteList = () => {
  const [jobsites, setJobsites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuantity, setSearchQuantity] = useState(5);
  const [searchResults, setSearchResults] = useState([]);
  const [datePickerViewable, setDatePickerViewable] = useState(true)
  const [dates, setDates] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);
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
    console.log('startDate', dates[0].startDate,
      'endDate', dates[0].endDate,);
    axios
      .get('/api/jobsite/search', {
        params: {
          searchTerm: searchTerm,
          startDate: dates[0].startDate,
          endDate: dates[0].endDate,
        },
      })
      .then((res) => {
        console.log(res.data);
        setSearchResults(res.data.jobsites);
      });
  };
  const dateFormat = 'yyyy-MM-dd';
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Jobsite Search
      </Typography>
      <TextField label="Search Jobsite" fullWidth variant="outlined" margin="dense" sx={{ maxWidth: '400px', paddingBottom: '10px' }} />
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary">
            Recent
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setDatePickerViewable(!datePickerViewable)}>
            Filter by Date
          </Button>
        </Grid>
      </Grid>
      {datePickerViewable && <DateRange
        editableDateInputs={true}
        onChange={item => setDates([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={dates}
        format={dateFormat}
        style={{
          border: '1px solid #000', // Specify your border properties here
          borderRadius: '5px', // Optional: Add border radius for rounded corners
          padding: '10px', // Optional: Add padding inside the border
        }}
      />
      } {/* Conditionally render DatePicker */}
      <Grid container spacing={2}>
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
    </div>
  );
};

export default JobsiteList;


/*
<Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Jobsites
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid conatiner>
            <Grid item xs={12}>
              <TextField
                label="Search Jobsites"
                variant="outlined"
                color="primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid container>
              <Grid item xs={0} sm={1} md={2} lg={3}></Grid>
              <Grid item xs={12} sm={10} md={8} lg={6} >

                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSearch()}
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRecent()}
                  >
                    recent
                  </Button>
                </Grid>
                <Grid item xs={0} sm={1} md={2} lg={3}></Grid>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
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
      </Grid>
*/