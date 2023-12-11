import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from './components/Sidebar';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import JobsiteList from './components/JobsiteList';
import { Container, Typography } from '@mui/material';
import JobsitePage from './components/JobsitePage';
import Welcome from './components/Welcome';
import JobsiteCreatePage from './components/JobsiteCreatePage';
import Createactivation from './components/Createactivation';
import NewUser from './components/NewUser'

import OLDTimecardList from './components/OldTimecardList';
import TimecardPage from './components/TimecardPage';
import TimecardCreatePage from './components/TimecardCreatePage';
import { useSelector } from 'react-redux';
import { Grid, useMediaQuery } from '@mui/material';
import TimecardSearchPage from './components/TimecardSearchPage';
// import Recovery from '../../backend/models/Recovery';
// <Route path="recover/:recoverId" element={<Recovery} />

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = 'http://localhost:3050';
  // const { HOST_IP } = process.env
  // axios.defaults.baseURL = `http://${HOST_IP}:3050`;

  const user = useSelector((state) => state.user.user.username);
  const isMdOrAbove = useMediaQuery((theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    setDrawerOpen(isMdOrAbove);
  }, [isMdOrAbove]);

  const [isHidden, setIsHidden] = useState(false)

  const toggleHidden = () => {
    setIsHidden(!isHidden)
  }

  const [drawerOpen, setDrawerOpen] = useState(true);
  return (
    <div className="App">
      {user ? (
        <Grid container spacing={1}>
          {/* <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <SideBar drawerOpen={drawerOpen} isHidden={isHidden} toggleHidden={toggleHidden} />
              </Grid> */}
          <Grid item
            xs={isHidden ? 1 : 3}
            sm={isHidden ? 1 : 3}
            md={isHidden ? 1 : 3}
            lg={isHidden ? 1 : 2.5}
            xl={isHidden ? 1 : 1}>
            <SideBar drawerOpen={drawerOpen} isHidden={isHidden} toggleHidden={toggleHidden} />
          </Grid>
          <Grid item
            xs={isHidden ? 11 : 9}
            sm={isHidden ? 11 : 9}
            md={isHidden ? 11 : 9}
            lg={isHidden ? 11 : 9.5}
            xl={11}>
            <Container maxWidth="lg">
              <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signup/:activationLink" element={<Signup />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="jobsite" element={<JobsiteList />} />
                <Route path="jobsites" element={<JobsiteList />} />
                <Route path="jobsite/create" element={<JobsiteCreatePage />} />
                <Route path="jobsite/:jobsiteId" element={<JobsitePage />} />
                <Route path="welcome" element={<Welcome />} />
                <Route path="createactivation" element={<Createactivation />} />
                <Route path="Timecard" element={<OLDTimecardList />} />
                <Route
                  path="timecardsearchpage"
                  element={<TimecardSearchPage />}
                />

                <Route path="Timecard/:timecardId" element={<TimecardPage />} />
                <Route
                  path="Timecard/create:timecardId"
                  element={<TimecardCreatePage />}
                />
                <Route
                  path="Timecard/create"
                  element={<TimecardCreatePage />}
                />
                <Route path="/" element={<Login />} />
              </Routes>
            </Container>
          </Grid>



          <Grid item xs={0} sm={0} md={0} lg={0} xl={0}></Grid>
        </Grid>
      ) : (
        <Container>
          <Routes>
            <Route path='newuser/:email/:activationKey' element={<NewUser />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signup/:activationId" element={<Signup />} />
            <Route path="createactivation" element={<Createactivation />} />

          </Routes>
        </Container>
      )}
    </div>
  );
}

export default App;

//<Route path='*' element={<Login />} />
