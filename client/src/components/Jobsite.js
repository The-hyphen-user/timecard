// import React, { useState, useEffect } from 'react'
// import { TextField, Grid, Card, Paper, Button, Box } from '@material-ui/core';

// const Jobsite = ({ id, start, isMisc, name, totalHours, address, description }) => {//, imageLink
//     return (
//             <div>jobsites</div>
//     )
// }

// export default Jobsite

import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Jobsite = ({ id, name, address, pictureLink, isAdmin, totalManHours, estimatedEndDate }) => {
  return (
    <Card variant="outlined" style={{ margin: '6px', padding: '6px' }}>
      <CardMedia
        component="img"
        alt={`Image of ${name}`}
        height="140"
        image={pictureLink}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          Jobsite: {name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Address: {address}
        </Typography>
        {isAdmin && (
          <>
            <Typography variant="body2" component="div">
              <strong>Total Man Hours: </strong> {totalManHours}
            </Typography>
            <Typography variant="body2" component="div">
              <strong>Estimated End Date: </strong> {estimatedEndDate}
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Jobsite;
