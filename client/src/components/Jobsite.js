// import React, { useState, useEffect } from 'react'
// import { TextField, Grid, Card, Paper, Button, Box } from '@material-ui/core';

// const Jobsite = ({ id, start, isMisc, name, totalHours, address, description }) => {//, imageLink
//     return (
//             <div>jobsites</div>
//     )
// }

// export default Jobsite

/* <CardMedia
component="img"
alt={`Image of ${name}`}
height="140"
image={pictureLink}
/> */

import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Jobsite = ({ _id, name, address, city, description, isAdmin, totalManHours, estimatedEndDate }) => {
  return (
    <Card variant="outlined" style={{ margin: '6px', padding: '6px' }}>

      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {address}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {description}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {city}
        </Typography>
        {isAdmin ? (
          <>
            <Typography variant="body2" component="div">
              <strong>Total Man Hours: </strong> {totalManHours}
            </Typography>
            <Typography variant="body2" component="div">
              <strong>Estimated End Date: </strong> {estimatedEndDate}
            </Typography>
          </>
        ) : (<><Typography variant="body2" component="div">
          <strong>Total Man Hours: </strong> {totalManHours}
        </Typography>
          <Typography variant="body2" component="div">
            <strong>Estimated End Date: </strong> {estimatedEndDate}
          </Typography></>)}
      </CardContent>
    </Card>
  );
};

export default Jobsite;
