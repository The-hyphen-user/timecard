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
import JobsiteCard from './JobsiteCard';
import TimecardCard from './TimecardCard';
import axios from 'axios';
import { setSearchedTimecards } from '../features/slices/timecardsSlice';

const TimecardSearchPage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const searchedTimecards = useSelector(
    (state) => state.timecards.searchedTimecards,
  );

  const handledSearch = () => {
    axios
      .get('/api/timecard/search', {
        params: {
          searchTerm,
        },
      })
      .then((res) => {
        dispatch(setSearchedTimecards(res.data.timecards));
      });
  };
  return <div>TimecardSearchPage</div>;
};

export default TimecardSearchPage;
