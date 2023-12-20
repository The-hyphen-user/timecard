import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import desired locale for dayjs

import React, { useEffect, useState } from 'react';

import {
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import JobsiteCard from './JobsiteCard';
import axios from 'axios';
import { DateRange } from 'react-date-range';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedJobsites } from '../features/slices/jobsitesSlice'

const JobsiteList = () => {
  const dispatch = useDispatch();
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
  const searchedJobsites = useSelector((state) => state.jobsites.searchedJobsites)
  const recentJobsitesToMe = useSelector((state) => state.jobsites.recentJobsitesToMe)
  const recentJobsitesToAll = useSelector((state) => state.jobsites.recentJobsitesToAll)
  const recentToMe = () => {

  }
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

  const handleSearch = async () => {
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
        dispatch(setSearchedJobsites(res.data.jobsites));
        setJobsites(res.data.jobsites)
        console.log('search data', res.data.jobsites)
      })
  };
  const handleRecentToMeDisplay = () => {
    setJobsites(recentJobsitesToMe)
  }
  const handleRecentToAllDisplay = () => {
    setJobsites(recentJobsitesToAll)
  }
  const dateFormat = 'yyyy-MM-dd';
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Jobsite Search🥌
      </Typography>
      <TextField label="Search Jobsite" fullWidth variant="outlined" margin="dense" sx={{ maxWidth: '400px', paddingBottom: '10px' }}
        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item>
          <Button variant="contained" color="primary"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary"
            onClick={handleRecentToMeDisplay}
          >
            Recent to me
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary"
            onClick={handleRecentToAllDisplay}
          >
            Recent to all
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
        {jobsites && jobsites.map((jobsite) => (
          <Grid item xs={12} md={6} lg={4} key={jobsite._id}>
            <Paper style={{ padding: '20px', cursor: 'pointer' }}>
              <JobsiteCard
                key={jobsite._id}
                jobsite={jobsite}
                isLinkable={true}
                isSelectable={true}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default JobsiteList;