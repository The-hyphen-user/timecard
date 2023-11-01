

import React, { useEffect } from 'react';
import { Card, CardContent, CardMedia, CardActionArea, Typography, Grid, Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedJobsite } from '../features/slices/jobsitesSlice'


// const JobsiteCard = ({ _id, name, address, city, startDate, description, totalHoursSoFar, createDate, lastWorked, isSelectable, isLinkable }) => {
const JobsiteCard = ({ jobsite, isSelectable, isLinkable }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const admin = true
  const selectedJobsite = useSelector((state) => state.jobsites.selectedJobsite)


  const [isSelected, setIsSelected] = React.useState(false);

  useEffect(() => {
    setIsSelected(selectedJobsite._id === jobsite._id)
  }, [selectedJobsite])

  const selectThisJobsite = () => {
    if (true) {
      dispatch(setSelectedJobsite({
        _id: jobsite._id,
        name: jobsite.name,
        address: jobsite.address,
        city: jobsite.city,
        startDate: jobsite.startDate,
        isMisc: jobsite.isMisc,
        description: jobsite.description,
        totalHoursSoFar: jobsite.totalHoursSoFar,
        createDate: jobsite.createDate,
        lastWorked: jobsite.lastWorked
      }))
    }
    if (isLinkable) {
      navigate(`/jobsite/${jobsite._id}`)
    }
    console.log('this jobsite', jobsite)
    console.log('selected jobsite', selectedJobsite)
    console.log('id', jobsite._id)
  }


  return (
    <Card variant="outlined" style={{ margin: '6px', padding: '6px' }}
      sx={{ backgroundColor: isSelected ? 'lightblue' : "" }}>
      <CardActionArea onClick={isSelectable ? selectThisJobsite : null}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="left">
            {jobsite.name}{/*jobsite._id*/}
          </Typography>
          <Typography variant="body2" component="div" gutterBottom align="left">
            {jobsite.address}
          </Typography>
          <Typography variant="body2" component="div" gutterBottom align="left">
            {jobsite.city}
          </Typography>
          <Typography variant="body2" component="div" gutterBottom align="left">
          </Typography>
          {admin &&
            <Typography variant="body2" component="div" gutterBottom align="left">
              {jobsite.totalHoursSoFar}
            </Typography>
          }
          {admin &&
            <Typography variant="body2" component="div" gutterBottom align="left">
              {jobsite.createDate}
            </Typography>
          }
          {admin &&
            <Typography variant="body2" component="div" gutterBottom align="left">
              {jobsite.lastWorked}
            </Typography>
          }
        </CardContent>
      </CardActionArea>
    </Card>


  );
};

export default JobsiteCard;
