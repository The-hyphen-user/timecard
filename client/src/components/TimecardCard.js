import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Grid,
  TextField,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setSelectedJobsite } from '../features/slices/jobsitesSlice';

const TimecardCard = ({ timecard, jobsiteName, jobsite, hasPicture, jobsiteImageURL, isLinkable }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [displayedJobsiteName, setDisplayedJobsiteName] = useState('missing name')
  const formattedDate = new Date(timecard.date).toLocaleDateString();
  const formattedStartTime = new Date(timecard.startTime).toLocaleTimeString(
    [],
    { hour: '2-digit', minute: '2-digit' },
  );
  const formattedEndTime = new Date(timecard.endTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleAddTimecard = () => {
    dispatch(setSelectedJobsite(jobsite))
    navigate('/dashboard')
  }

  useEffect(() => {
    if (jobsite){
      setDisplayedJobsiteName(jobsite.name)
      console.log('jobsite')
    }else if (jobsiteName){
      setDisplayedJobsiteName(jobsiteName)
      console.log('jobsiteName')
    }
  }, [])

  return (
    <div>
      <Card variant="outlined" style={{ margin: '6px', padding: '6px' }}>
        {hasPicture ?
          <CardMedia
            component="img"
            height="240"
            image={jobsiteImageURL ? `http://localhost:5000${jobsiteImageURL}` : 'http://localhost:5000/uploads/default.png'}
            alt={jobsite.name}
          />
          : <></>}
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="left">
            {displayedJobsiteName}
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
          {isLinkable && <Button
          variant="contained"
          onClick={handleAddTimecard}
          >Add Timecard to this Jobsite</Button>}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimecardCard;
