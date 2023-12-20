import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

const DisplayReport = () => {
  const [report, setReport] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleReportRequest = () => {
    axios.get('/api/report', {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    })
      .then(res => {
        setReport(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>DisplayReport
      <br />
      <Button onClick={handleReportRequest}>Submit</Button>
    </div>
  )
}


export default DisplayReport

/*
report list all employee timecards and is sortable by employee, jobsite or day

*/