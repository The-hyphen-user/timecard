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
} from '@mui/material';
import axios from 'axios';

const TimecardCard = ({ timecard, jobsiteName }) => {
  const formattedDate = new Date(timecard.date).toLocaleDateString();
  const formattedStartTime = new Date(timecard.startTime).toLocaleTimeString(
    [],
    { hour: '2-digit', minute: '2-digit' },
  );
  const formattedEndTime = new Date(timecard.endTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div>
      <Card variant="outlined" style={{ margin: '6px', padding: '6px' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="left">
            {jobsiteName ? jobsiteName : ''}
          </Typography>
          <Typography color="textSecondary" align="left">
            {formattedDate}
          </Typography>
          <Typography color="textSecondary" gutterBottom align="left">
            hours: {timecard.hours}
          </Typography>
          <Typography color="textSecondary" gutterBottom align="left">
            {formattedStartTime} - {formattedEndTime}
          </Typography>
          <Typography color="textSecondary" gutterBottom align="left">
            {timecard.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimecardCard;
