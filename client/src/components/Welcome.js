import React from "react";
import { Typography, Button, Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
    textAlign: "center",
  },
  greeting: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Welcome = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography variant="h4" className={classes.greeting}>
        Welcome to Our Timecard App🎉!
      </Typography>
      <Typography variant="body1" paragraph>
        Congratulations on registering with us. You are now part of our construction community.
        Here's what you can do:
      </Typography>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} md={6}>
          <Typography variant="body1">1. Log your working hours on different jobsites.</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">2. Look up different jobsites.</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1">3. View your timecard history and reports.</Typography>
        </Grid>
      </Grid>
      <Button
        component={Link}
        to="/dashboard"
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Get Started
      </Button>
    </Container>
  );
};

export default Welcome;
