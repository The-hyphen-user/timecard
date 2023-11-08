import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Typography,
  Grid,
  TextField,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import axios from 'axios';
import {
  setRecentJobsitesToAll,
  setRecentJobsitesToMe,
  setSearchedJobsites,
} from '../features/slices/jobsitesSlice';
import JobsiteCard from './JobsiteCard';

const JobsiteSearchPage = () => {
  const [search, setSearch] = useState('');
  const selectedJobsite = useSelector(
    (state) => state.jobsites.selectedJobsite,
  );
  const recentToMeJobsites = useSelector(
    (state) => state.jobsites.recentJobsitesToMe,
  );

  const recentToAllJobsites = useSelector(
    (state) => state.jobsites.recentJobsitesToAll,
  );
  const searchedJobsites = useSelector(
    (state) => state.jobsites.searchedJobsites,
  );
  const dispatch = useDispatch();
  const [searchCategory, setSearchCategory] = useState('');
  const [jobsites, setJobsites] = useState([]);
  const [searchRsults, setSearchResults] = useState([]);
  const [recentToMeResults, setrecentToMeResults] = useState([]);
  const [recentToAllResults, setrecentToAllResults] = useState([]);

  const handleSearch = () => {
    console.log('searching for :', search);
    axios
      .get('/api/jobsite/search', { params: { searchTerm: search } })
      .then((res) => {
        setSearchCategory('searchResults');
        console.log('search results', res.data);
        dispatch(setSearchedJobsites(res.data.jobsites));
        setJobsites(res.data.jobsites);
      });
  };

  useEffect(() => {
    axios
      .get('/api/jobsite/recenttoall', {
        params: {
          searchQuantity: 12,
        },
      })
      .then((res) => {
        console.log('recenttoall', res.data.jobsites);
        // dispatch(setRecentToAllJobsites(res.data.jobsites))
        dispatch(setRecentJobsitesToAll(res.data.jobsites));
      });

    axios.get('/api/jobsite/recenttome').then((res) => {
      console.log('recenttome', res.data.jobsites);
      dispatch(setRecentJobsitesToMe(res.data.jobsites));
      // setJobsites(recentToMeJobsites)
      // setrecentToMeResults(res.data.jobsites)
    });
  }, []);

  useEffect(() => {
    switch (searchCategory) {
      case 'recentToAll':
        setJobsites(recentToMeJobsites)
        break;
      case 'recentToMe':
        setJobsites(recentToAllJobsites)
        break;
      case 'searchResults':
        setJobsites(searchedJobsites)
        break;
      default:
    }
  }, [recentToMeJobsites, recentToAllJobsites, searchedJobsites])

  const recentToAll = () => {
    searchCategory === 'recentToAll'
      ? setSearchCategory('')
      : setSearchCategory('recentToAll');
    setJobsites(recentToAllJobsites);
    console.log(jobsites);
  };
  const recentToMe = () => {
    searchCategory === 'recentToMe'
      ? setSearchCategory('')
      : setSearchCategory('recentToMe');
    setJobsites(recentToMeJobsites);
    console.log(jobsites);
  };
  const searchResults = () => {
    searchCategory === 'searchResults'
      ? setSearchCategory('')
      : setSearchCategory('searchResults');
    setJobsites(searchedJobsites);
    console.log(jobsites);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Typography variant="h4">Jobsites search</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ToggleButtonGroup
            color="primary"
            variant="solid"
            exclusive
            value={searchCategory}
          >
            <Button
              variant="contained"
              onClick={recentToMe}
              sx={{
                background:
                  searchCategory === 'recentToMe' ? 'primary' : 'lightgrey',
              }}
            >
              recent to me
            </Button>
            <Button
              variant="contained"
              onClick={recentToAll}
              sx={{
                background:
                  searchCategory === 'recentToAll' ? 'primary' : 'lightgrey',
              }}
            >
              recent to all
            </Button>
            <Button
              variant="contained"
              onClick={searchResults}
              sx={{
                background:
                  searchCategory === 'searchResults' ? 'primary' : 'lightgrey',
              }}
            >
              Search Results
            </Button>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Grid
            container
            spacing={2}
            sx={{ maxHeight: '65vh', overflow: 'auto' }}
          >
            <Grid item xs={12} sm={12} lg={12} xl={12}>
              <Typography variant="h4">
                Jobsites{jobsites ? 'yup' : 'nope'}
              </Typography>
            </Grid>
            {jobsites.map((jobsite) => (
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <JobsiteCard
                  key={jobsite._id}
                  jobsite={jobsite}
                  isSelectable={true}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          spoop
        </Grid>
      </Grid>
    </div>
  );
};

export default JobsiteSearchPage;
