import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Typography,
  Grid,
  TextField,
  Container,
} from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import TimecardCreatePage from './TimecardCreatePage';
import JobsiteSearchPage from './JobsiteSearchPage';
import TimecardCard from './TimecardCard';
import JobsiteCard from './JobsiteCard';
import TimecardsByJobsiteId from './TimecardsByJobsiteId';
import { setSelectedJobsite } from '../features/slices/jobsitesSlice';

const OLDTimecardList = () => {
  const [timecards, setTimecards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayQuantity, setDisplayQuantity] = useState(5);
  const [alteredSelectedJobsite, setAlteredSelectedJobsite] = useState({});

  const selectedJobsite = useSelector(
    (state) => state.jobsites.selectedJobsite,
  );

  useEffect(() => {
    axios.get('/api/timecard/recent').then((res) => {
      setTimecards(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    setAlteredSelectedJobsite({
      _id: selectedJobsite._id,
      name: selectedJobsite.name,
      address: selectedJobsite.address,
      city: selectedJobsite.city,
      startDate: selectedJobsite.startDate,
      isMisc: false,
      description: selectedJobsite.description,
      totalHoursSoFar: selectedJobsite.totalHoursSoFar,
      createDate: selectedJobsite.createDate,
      lastWorked: selectedJobsite.lastWorked,
    });
    //console.log('alteredSelectedJobsite', alteredSelectedJobsite, 'selectedJobsite', selectedJobsite)

    axios
      .get('/api/timecard/recent', {
        params: { jobsiteId: selectedJobsite._id },
      })
      .then((res) => {
        setTimecards(res.data);
        console.log(res.data);
      });
  }, [selectedJobsite]);

  const handleSearch = () => {
    // axios.get
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h4">Timecard list</Typography>
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
            <Typography variant="h5">
              Timecards for {selectedJobsite.name}
            </Typography>
            <TimecardsByJobsiteId />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OLDTimecardList;
