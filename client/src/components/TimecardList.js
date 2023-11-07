//giving a list of timecards and displays them
import React, { useEffect, useState } from 'react';
import { Button, Typography, Grid, TextField, Container } from '@mui/material';

import TimecardCard from './TimecardCard';
import JobsiteCard from './JobsiteCard';

const TimecardList = ({ timecards }) => {
  return (
    <Grid>
      <Grid item xs={12}>
        <Typography variant="h4">List of timecards</Typography>
      </Grid>
      <Grid item xs={12}>
        {timecards.map((timecard) => (
          <TimecardCard key={timecard._id} timecard={timecard} />
        ))}
      </Grid>
    </Grid>
  );
};

export default TimecardList;
