import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Import desired locale for dayjs

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button,
  Grid,
  TextField,
  Container,
  Typography,
  Paper,
} from '@mui/material';
// import timecardCard from './TimecardCard';
import TimecardCard from './TimecardCard'
import axios from 'axios';
import { setSearchedTimecards } from '../features/slices/timecardsSlice';
import { DateRange } from 'react-date-range';

const TimecardSearchPage = () => {
  const dispatch = useDispatch();
  const [timecards, setTimecards] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const searchedTimecards = useSelector(
    (state) => state.timecards.searchedTimecards,
  );
  const recentTimecards = useSelector((state) => state.timecards.recentTimecards)
  const [searchQuantity, setSearchQuantity] = useState(5);
  const [datePickerViewable, setDatePickerViewable] = useState(true)
  const [dates, setDates] = useState([
    {
      startDate: null,
      endDate: null,
      key: 'selection'
    }
  ]);

  const dateFormat = 'yyyy-MM-dd';
  const handleSearch = () => {
    console.log('search time for timecards', searchTerm,
      dates[0].startDate,
      dates[0].endDate,
    )
    axios
      .get('/api/timecard/search', {
        params: {
          searchTerm,
          startDate: dates[0].startDate,
          endDate: dates[0].endDate,
        },
      })
      .then((res) => {
        console.log('responce:', res)
        dispatch(setSearchedTimecards(res.data.timecards));
        setTimecards(searchedTimecards)
      });
  };

  const handleRecentDisplay = () => {
    setTimecards(recentTimecards)
  }
  return (<div style={{ padding: '20px' }}>
    <Typography variant="h4" component="h1" align="center" gutterBottom>
      Timecard Search⭕
    </Typography>
    <TextField label="Search Jobsite" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} fullWidth variant="outlined" margin="dense" sx={{ maxWidth: '400px', paddingBottom: '10px' }} />
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
        onClick={handleRecentDisplay}
        >
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
    } {timecards &&
      <Grid container spacing={2}>
        {timecards.map((timecard) => (
          <Grid item xs={12} md={6} lg={4} key={timecard._id}>
            <Paper style={{ padding: '20px', cursor: 'pointer' }}>
              <TimecardCard
                key={timecard._id}
                timecard={timecard}
                isLinkable={false}
                isSelectable={false}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    }
  </div>
  )
};

export default TimecardSearchPage;


/* 
{searchedTimecards &&
      <Grid container spacing={2}>
        {searchedTimecards.map((timecard) => (
          <Grid item xs={12} md={6} lg={4} key={timecard._id}>
            <Paper style={{ padding: '20px', cursor: 'pointer' }}>
              <TimecardCard
                key={timecard._id}
                timecard={timecard}
                isLinkable={false}
                isSelectable={false}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    }
*/