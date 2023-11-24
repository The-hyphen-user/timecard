import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedJobsite } from '../features/slices/jobsitesSlice';

// const JobsiteCard = ({ _id, name, address, city, startDate, description, totalHoursSoFar, createDate, lastWorked, isSelectable, isLinkable }) => {
const JobsiteCard = ({ jobsite, isSelectable, isLinkable }) => {
  const formattedStartDate = new Date(jobsite.startDate).toLocaleDateString();
  const formattedLastWorked = new Date(jobsite.lastWorked).toLocaleDateString();
  // const formatteda = new Date(jobsite).toLocaleDateString();
  // const formatted = new Date(jobsite).toLocaleDateString();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = true;
  const selectedJobsite = useSelector(
    (state) => state.jobsites.selectedJobsite,
  );

  const [isSelected, setIsSelected] = React.useState(false);

  useEffect(() => {
    setIsSelected(selectedJobsite._id === jobsite._id);
  }, [selectedJobsite]);

  const selectThisJobsite = () => {
    if (true) {
      dispatch(
        setSelectedJobsite({
          _id: jobsite._id,
          name: jobsite.name,
          address: jobsite.address,
          city: jobsite.city,
          startDate: jobsite.startDate,
          isMisc: jobsite.isMisc,
          description: jobsite.description,
          totalHoursSoFar: jobsite.totalHoursSoFar,
          createDate: jobsite.createDate,
          lastWorked: jobsite.lastWorked,
          imageURL: jobsite.imageURL,
        }),
      );
    }
    if (isLinkable) {
      navigate(`/jobsite/${jobsite._id}`);
    }
    console.log('this jobsite', jobsite);
    console.log('selected jobsite', selectedJobsite);
    console.log('id', jobsite._id);
  };

  return (
    <Card
      variant="outlined"
      style={{ margin: '6px', padding: '6px' }}
      sx={{ backgroundColor: isSelected ? 'lightblue' : '' }}
    >
      <CardActionArea onClick={isSelectable ? selectThisJobsite : null}>
        <CardMedia
          component="img"
          height="240"
          image={jobsite.imageURL ? `http://localhost:5000${jobsite.imageURL}` : 'http://localhost:5000/uploads/default.png'}
          alt={jobsite.name}
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="left">
            {jobsite.name}
            {/*jobsite._id*/}
          </Typography>
          <Typography variant="body2" component="div" gutterBottom align="left">
            {jobsite.address}
          </Typography>
          <Typography variant="body2" component="div" gutterBottom align="left">
            {jobsite.city}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            gutterBottom
            align="left"
          ></Typography>
          {admin && (
            <Typography
              variant="body2"
              component="div"
              gutterBottom
              align="left"
            >
              total hours: {jobsite.totalHoursSoFar}
            </Typography>
          )}
          {admin && (
            <Typography
              variant="body2"
              component="div"
              gutterBottom
              align="left"
            >
              Start Date: {formattedStartDate}
            </Typography>
          )}
          {admin && (
            <Typography
              variant="body2"
              component="div"
              gutterBottom
              align="left"
            >
              last worked: {formattedLastWorked}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JobsiteCard;
