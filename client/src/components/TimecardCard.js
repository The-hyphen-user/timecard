import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Typography,
  Grid,
  TextField,
} from '@mui/material'
import axios from 'axios'

const TimecardCard = ({ timecard, jobsiteName }) => {
  return (
    <div>
      <Card variant="outlined" style={{ margin: '6px', padding: '6px' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="left">
            {jobsiteName?jobsiteName:''}
          </Typography>
          <Typography color="textSecondary" align="left">
            {timecard.date}
          </Typography>
          <Typography color="textSecondary" gutterBottom align="left">
            hours: {timecard.hours}
          </Typography>
          <Typography color="textSecondary" gutterBottom align="left">
            {timecard.startTime}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default TimecardCard