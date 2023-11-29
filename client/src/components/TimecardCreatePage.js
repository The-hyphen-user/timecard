import { Button, Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState, } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addTimecardToJobsiteId } from '../features/slices/timecardsSlice'
import { updateJobSiteInAllArrays, addRecentToMeIfNeeded } from '../features/slices/jobsitesSlice'
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import TimecardCard from './TimecardCard';

const TimecardCreatePage = () => {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = React.useState('');
  const [newTimecardDetails, setNewTimecardDetails] = useState('')
  const [recentTimecards, setRecentTimecards] = useState([])
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()))
  const [selectedHours, setSelectedHours] = useState(8)
  const [startTime, setStartTime] = useState(dayjs().startOf('date').add(8, 'hour'))
  const [endTime, setEndTime] = useState(dayjs().startOf('date').add(16, 'hour').add(30, 'minute'))
  const [lastEditedTime, setLastEditedTime] = useState('start')
  const [submittedTimecard, setSubmittedTimecard] = useState(null)
  const [submittedTimecardId, setSubmittedTimecardId] = useState('')
  const [error, setError] = useState('')

  const selectedJobsite = useSelector((state) => state.jobsites.selectedJobsite)
  const [submittedJobsiteName, setSubmittedJobsiteName] = useState('')

  useEffect(() => {
    setError('')
  }, [selectedJobsite._id])

  const handleSubmit = () => {//add timecard to db
    if (!selectedJobsite._id) {
      setError("must select jobsite")
    } else {
      console.log('selectedJobsite', selectedJobsite)
      console.log('submitting timecard date')
      console.log('date:', selectedDate)
      console.log('hours:', selectedHours)
      console.log('startTime:', startTime)
      console.log('endTime:', endTime)
      console.log('details:', newTimecardDetails)
      console.log('isProcessed:', false)
      console.log('edits:', [])
      setSubmittedJobsiteName(selectedJobsite.name)
      setSubmittedTimecardId(selectedJobsite._id)
      // const jobsiteId = selectedJobsite ? selectedJobsite._id : 1

      const now = new Date()

      axios.post('/api/timecard/create', {
        timecard: {
          date: selectedDate,
          hours: selectedHours,
          jobsite: selectedJobsite._id,
          startTime: now,
          endTime: now,
          description: newTimecardDetails,
          isProcessed: false,
          edits: [],
        }
      })
        .then((res) => {
          console.log('res data:', res.data)
          setSubmittedTimecard(res.data.timecard)
          dispatch(addTimecardToJobsiteId({ jobsiteId: selectedJobsite._id, timecard: res.data.timecard }))//submittedTimecard
          dispatch(addRecentToMeIfNeeded({ newRecentJobsite: selectedJobsite }))
          dispatch(updateJobSiteInAllArrays({
            updatedJobsite: res.data.updatedJobsite
          }))
        })
        .catch((err) => {
          console.log(err)
          setError(err)
        })
    }
  }

  const acknowledgeError = () => {
    setError('')
  }

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);

    setStartTime(
      startTime
      .set('year', selectedDate.year())
      .set('month', selectedDate.month())
      .set('date', selectedDate.date())
    )
    setEndTime(
      endTime
      .set('year', selectedDate.year())
      .set('month', selectedDate.month())
      .set('date', selectedDate.date())
    )
  };
  const resetSubmittedTimecard = () => {
    setSubmittedTimecard(null)
  }

  const handleChangeSelectedHours = (hours) => {
    console.log('newtime or date:', hours)
    setSelectedHours(hours)
    if (lastEditedTime === 'start'){
      setEndTime(startTime.add(hours, 'hour'))
    } else if (lastEditedTime === 'end'){
      setStartTime(endTime.subtract(hours, 'hour'))
      if (!selectedDate.isSame(startTime, 'day')){
        setSelectedDate(startTime)
      }
    }
  }
  const handleChangeStartTime = (newTime) => {
    console.log('newtime or date:', newTime)
    setLastEditedTime('start')
    setStartTime(newTime)
      setEndTime(newTime.add(selectedHours, 'hour'))
  }
  const handleChangeEndTime = (newTime) => {
    setLastEditedTime('end')
    console.log('newtime or date:', newTime)
    setEndTime(newTime)
    setStartTime(newTime.subtract(selectedHours, 'hour'))
    if (!selectedDate.isSame(startTime, 'day')){
      setSelectedDate(startTime)
    }
  }

  return (
    <div>
      {submittedTimecard ?
        <Container>
          <TimecardCard timecard={submittedTimecard} jobsiteName={submittedJobsiteName} />
          <Button variant='contained' onClick={resetSubmittedTimecard}>
            Add another Timecard
          </Button>
        </Container> : <>
          <Container maxWidth="lg" style={{ paddingLeft: '35px', paddingRight: '35px' }}>
            <Typography variant="h4" style={{ marginTop: '20px' }}>
              Add a Timecard
            </Typography>
          </Container>


          <>
            <Grid container spacing={2} style={{ padding: '20px' }} justifyContent="center">
              <Grid item xs={12} sx={{ border: '1px solid #ccc', padding: '16px', minWidth: '180px', display: 'flex', flexGrow: 1, alignItems: 'left' }}>

                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Date"
                      value={selectedDate} 
                      onChange={(newDate) => handleDateChange(newDate)} /> {/*defaultValue={today}*/}
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ border: '1px solid #ccc', padding: '8px', display: 'flex', flexGrow: 1, alignItems: 'left', minWidth: '180px' }}>

                <FormControl fullWidth>
                  {selectedJobsite.name ?
                    <Typography>{selectedJobsite.name}</Typography> : <>
                      {error ? <>
                        <Typography sx={{ color: 'warning.main', fontWeight: 'bold' }}>You Must Select A Jobsite</Typography>
                      </> : <>
                        <Typography >Select a Jobsite</Typography>
                      </>}


                    </>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ border: '1px solid #ccc', padding: '20px' }}>
                <FormControl fullWidth></FormControl>
                <TextField label="details" variant="outlined" fullWidth multiline rows={3}
                  value={newTimecardDetails}
                  onChange={(e) => setNewTimecardDetails(e.target.value)}
                  sx={{}} />

              </Grid>
              <Grid item xs={true} sm={true} md={true} sx={{ border: '1px solid #ccc', padding: '8px' }}>
                <FormControl fullWidth>
                  <TextField label='hours' variant='outlined' type='number'
                    inputProps={{
                      min: 0,
                      max: 24,
                      step: 0.25,
                    }}
                    sx={{}}
                    value={selectedHours}
                    onChange={(e) => handleChangeSelectedHours(e.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={true} sm={true} md={true}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      label='start time'
                      value={startTime}
                      onChange={(newTime) => handleChangeStartTime(newTime)}
                    />
                    <br />

                    <TimePicker
                      label='end time'
                      value={endTime}
                      onChange={(newTime) => handleChangeEndTime(newTime)}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3} style={{ padding: '20px' }}>
              <FormControl fullWidth>
                <Button variant='contained' onClick={handleSubmit}>Submit</Button>
              </FormControl>
            </Grid>
          </>
        </>}
    </div >
  )
}

export default TimecardCreatePage
