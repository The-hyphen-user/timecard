import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((state) => state.user.user.username);
  return (
    <div>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Link to="/home">
            <Button variant="contained" color="primary">
              Home
            </Button>
          </Link>
        </Grid>

        {user ?
          <Grid item>
            <Link to="/dashboard">
              <Button variant="contained" color="primary">
                dashboard
              </Button>
            </Link>
          </Grid>
          :
          <Grid item>
            <Link to="/login">
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          </Grid>}

        <Grid item>
          <Link to="/signup">
            <Button variant="contained" color="primary">
              Signup
            </Button>
          </Link>
        </Grid>

        <Grid item>
          <Link to="/jobsite">
            <Button variant="contained" color="primary">
              jobsites
            </Button>
          </Link>
        </Grid>

        <Grid item>
          <Link to="jobsite/create">
            <Button variant="contained" color="primary">
            jobsite creation magic
            </Button>
          </Link>
        </Grid>

        <Grid item>
          <Link to="/about">
            <Button variant="contained" color="primary">
              About
            </Button>
          </Link>
        </Grid>

      </Grid>
    </div>
  );
};

export default Header;

