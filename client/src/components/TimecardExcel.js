import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import dayjs from 'dayjs';
import { subWeeks, startOfDay, endOfDay } from 'date-fns';
import 'dayjs/locale/en'; // Import desired locale for dayjs

import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import axios from 'axios'
import { Table, Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const TimecardExcel = () => {
  const twoWeeksAgo = subWeeks(startOfDay(new Date()), 2);
  const endOfToday = endOfDay(new Date());
  const [sortBy, setSortBy] = useState('jobsite.name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBySymbol, setSortBySymbol] = useState('↓')
  const [timecards, setTimecards] = useState([])
  const [datePickerViewable, setDatePickerViewable] = useState(true)
  const [displayJobsite, setDisplayJobsite] = useState(true)
  const [displayUsername, setDisplayUsername] = useState(true)
  const [displayDate, setDisplayDate] = useState(true)
  const [displayHours, setDisplayHours] = useState(true)
  const [displayStartTime, setDisplayStartTime] = useState(true)
  const [displayEndTime, setDisplayEndTime] = useState(true)
  const [displayIsProcessed, setDisplayIsProcessed] = useState(true)
  const [displayEdits, setDisplayEdits] = useState(true)
  const [displayDescription, setDisplayDescription] = useState(true)

  const [dates, setDates] = useState([
    {
      startDate: twoWeeksAgo,
      endDate: endOfToday,
      key: 'selection'
    }
  ]);


  useEffect(() => {
    const startDate = dates[0].startDate;
    const endDate = dates[0].endDate;

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/excel', {
          headers: {
            TimeCardAccessKey: 123456789,
          },
          params: {
            startDate,
            endDate,
          }
        });

        // Handle the response as needed
        console.log(response.data); // You can replace this with your logic
        setTimecards(response.data)

      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };
    if (dates[0].startDate === null && dates[0].endDate === null
      || dates[0].startDate !== null && dates[0].endDate !== null
      && dates[0].startDate !== dates[0].endDate) {
      fetchData();
    }
  }, [dates]);


  const handleSort = (column) => {
    console.log('column', column)
    if (sortBy === column) {
      // setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
      setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
      setSortBySymbol((sortBySymbol) => (sortBySymbol === '↓' ? '↑' : '↓'))
    } else {
      setSortBy(column);
      setSortOrder('asc');
      setSortBySymbol('↓')
    }
  };

  const sortedTimecards = [...timecards].sort((a, b) => {
    const getNestedValue = (obj, key) => {
      const keys = key.split('.');
      return keys.reduce((acc, currentKey) => (acc ? acc[currentKey] : acc), obj);
    };

    let aValue = getNestedValue(a, sortBy);
    let bValue = getNestedValue(b, sortBy);

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
    }
    if (typeof bValue === 'string') {
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });


  const dateFormat = 'yyyy-MM-dd';
  return (
    <>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4">Timecards</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={() => setDatePickerViewable(!datePickerViewable)}>
            {datePickerViewable ? 'Hide calender' : 'reveal Calender'}
          </Button>
        </Grid>
        <Grid item xs={12}>
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
          }
        </Grid>
        <Grid item xs={12}>

          <Button variant='contained'
            sx={{
              background:
                displayJobsite ? 'primary' : 'lightgrey'
            }}
            onClick={() => setDisplayJobsite(!displayJobsite)}>Jobsite</Button>
          <Button variant='contained'
            sx={{
              background:
                displayUsername ? 'primary' : 'lightgrey'
            }}
            onClick={() => setDisplayUsername(!displayUsername)}>Employee</Button>
          <Button variant='contained'
            sx={{
              background:
                displayDate ? 'primary' : 'lightgrey'
            }}
            onClick={() => setDisplayDate(!displayDate)}>Date</Button>
          <Button variant='contained'
            sx={{
              background:
                displayHours ? 'primary' : 'lightgrey'
            }}
            onClick={() => setDisplayHours(!displayHours)}>Hours</Button>
          <Button variant='contained'
            sx={{
              background:
                displayStartTime ? 'primary' : 'lightgrey'
            }}
            onClick={() => setDisplayStartTime(!displayStartTime)}>Start Time</Button>
          <Button variant='contained'
            sx={{
              background:
                displayEndTime ? 'primary' : 'lightgrey'
            }}
            onClick={() => setDisplayEndTime(!displayEndTime)}>End Time</Button>
          <Button variant='contained'
            sx={{
              background:
                displayIsProcessed ? 'primary' : 'lightgrey'
            }}
            onClick={() => setDisplayIsProcessed(!displayIsProcessed)}>Processed</Button>
          <Button variant='contained'
            sx={{
              background:
                displayEdits ? 'primary' : 'lightgrey'
            }}
            onClick={() => setDisplayEdits(!displayEdits)}>Edits</Button>
          <Button variant='contained'
            sx={{
              background:
                displayDescription ? 'primary' : 'lightgrey'
            }}
            onClick={() => setDisplayDescription(!displayDescription)}>Description</Button>
        </Grid>
        <Grid item>
          {timecards.length !== 0 ? (
            <TableContainer component={Paper} style={{ overflow: 'auto', maxHeight: '75vh' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {displayJobsite &&
                      <TableCell onClick={() => handleSort('jobsite.name')}>
                        {sortBy === 'jobsite.name' ? <> <strong>Jobsite</strong> {sortBySymbol} </> : 'Jobsite'}
                      </TableCell>}
                    {displayUsername &&
                      <TableCell onClick={() => handleSort('user.username')}>
                        {sortBy === 'user.username' ? <> <strong>Employee</strong> {sortBySymbol} </> : 'Employee'}
                      </TableCell>}
                    {displayDate &&
                      <TableCell onClick={() => handleSort('date')}>
                        {sortBy === 'date' ? <> <strong>Date</strong> {sortBySymbol} </> : 'Date'}
                      </TableCell>}
                    {displayHours &&
                      <TableCell onClick={() => handleSort('hours')}>
                        {sortBy === 'hours' ? <> <strong>Hours</strong> {sortBySymbol} </> : 'Hours'}
                      </TableCell>}
                    {displayStartTime &&
                      <TableCell onClick={() => handleSort('startTime')}>
                        {sortBy === 'startTime' ? <> <strong>Start Time</strong> {sortBySymbol} </> : 'Start Time'}
                      </TableCell>}
                    {displayEndTime &&
                      <TableCell onClick={() => handleSort('endTime')}>
                        {sortBy === 'endTime' ? <> <strong>End Time</strong> {sortBySymbol} </> : 'End Time'}
                      </TableCell>}
                    {displayIsProcessed &&
                      <TableCell onClick={() => handleSort('isProcessed')}>
                        {sortBy === 'isProcessed' ? <> <strong>Is Processed</strong> {sortBySymbol} </> : 'Is Processed'}
                      </TableCell>}
                    {displayEdits &&
                      <TableCell onClick={() => handleSort('edits.length')}>
                        {sortBy === 'edits.length' ? <> <strong>Has Edits</strong> {sortBySymbol} </> : 'Has Edits'}
                      </TableCell>}
                    {displayDescription &&
                      <TableCell   >Description</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedTimecards.map((timecard) => (
                    <TableRow key={timecard._id}>
                      {displayJobsite && <TableCell>{timecard.jobsite.name}</TableCell>}
                      {displayUsername &&
                        <TableCell>{timecard.user.username}</TableCell>}
                      {displayDate &&
                        <TableCell>{new Date(timecard.date).toLocaleDateString()}</TableCell>}
                      {displayHours &&
                        <TableCell>{timecard.hours}</TableCell>}
                      {displayStartTime &&
                        <TableCell>{new Date(timecard.startTime).toLocaleTimeString()}</TableCell>}
                      {displayEndTime &&
                        <TableCell>{new Date(timecard.endTime).toLocaleTimeString()}</TableCell>}
                      {displayIsProcessed &&
                        <TableCell>{timecard.isProcessed ? 'Yes' : 'No'}</TableCell>}
                      {displayEdits &&
                        <TableCell>{timecard.edits.length === 0 ? 'No' : 'Yes'}</TableCell>}
                      {displayDescription &&
                        <TableCell>{timecard.description}</TableCell>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Paper style={{ padding: '16px', marginTop: '16px' }}>
              <Typography variant="subtitle1">
                No timecards found.
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default TimecardExcel;
