import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobsiteCreatePage = () => {
  const navigate = useNavigate();
  const defaultCity = 'Santa Cruz';
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(defaultCity);
  const [startDate, setStartDate] = useState('');
  const [isMisc, setIsMisc] = useState(false);
  const [description, setDescription] = useState('');
  const [totalHoursSoFar, setTotalHoursSoFar] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null); // New state for error message

  const formatDate = (date) => {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  };

  const handleImageChange = (e) => {
    // Set the selected image file in the state
    setImage(e.target.files[0]);
    setError(null); // Clear previous error if an image is selected
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = formatDate(startDate);
    const submitDescription =
      description === '' ? `Construction jobsite on ${address}` : description;

    if (!image) {
      setError('Please select an image for the job site.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result.split(',')[1];
      console.log(imageData)

      axios
        .post('/api/jobsite/create', {
          name: name,
          address: address,
          city: city,
          startDate: startDate,
          isMisc: isMisc,
          description: submitDescription,
          totalHoursSoFar: totalHoursSoFar,
          imageData: imageData,
          // subscribers: subscribers
        })
        .then((res) => {
          console.log('id', res.data.id);
          navigate(`/jobsite/${res.data.id}`);
        })
        .catch((error) => {
          setError('Error creating job site. Please try again.');
        });

    }
    reader.readAsDataURL(image);
  }

  const handleCityFocus = (e) => {
    if (e.target.value === defaultCity) {
      e.target.select();
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create a New Jobsite
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Jobsite Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            onFocus={handleCityFocus}
            label="City"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="total hours worked"
            variant="outlined"
            type="number"
            value={totalHoursSoFar}
            onChange={(e) => setTotalHoursSoFar(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="description"
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Grid item xs={12}>
            {/* Image input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Jobsite
        </Button>
      </Grid>
    </Container>
  );
};

export default JobsiteCreatePage;
