import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const TimecardPage = ({
  id,
  username,
  userId,
  jobSiteName,
  date,
  hours,
  tasks,
  recorded,
}) => {
  return (
    <Card
      variant="outlined"
      style={{
        margin: '6px',
        padding: '6px',
        backgroundColor: recorded ? '#888888' : 'inherit', // Grey background for recorded cards
        transition: 'background-color 0.3s ease',
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Time Card {date}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          User: {username} | Job Site: {jobSiteName}
        </Typography>
        <Typography
          variant="body2"
          component="div"
          style={{ marginTop: '10px' }}
        >
          <strong>Number of Hours: </strong> {hours}
        </Typography>
        <Typography variant="body2" component="div">
          <strong>Tasks: </strong> {tasks}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TimecardPage;
