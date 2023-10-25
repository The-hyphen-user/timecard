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
  Container,
} from '@mui/material'
import axios from 'axios'

const TimecardList = () => {
  const [timecards, setTimecards] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [displayQuantity, setDisplayQuantity] = useState(5)

  useEffect(() => {
    axios.get('/api/timecard/recent')
      .then((res) => {
        setTimecards(res.data)
        console.log(res.data)
      })
  }, [])

  const handleSearch = () => {
    // axios.get
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h4">Timecards</Typography>
      </Grid>
      <Grid item xs={2} sm={4} md={4} direction="column"> 
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
        <Button variant='contained' onClick={handleSearch}>Search</Button>
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <Typography variant="h4">filter</Typography>
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <Typography variant="h4">Timecards</Typography>
      </Grid>
      <Grid item xs={2} sm={4} md={4}>
        <Typography variant="h4">Timecards</Typography>
      </Grid>

    </Grid>
  )
}

export default TimecardList