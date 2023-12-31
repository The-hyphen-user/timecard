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
import DisplayReport from './components/DisplayReport';
import TimecardExcel from './components/TimecardExcel'
// import Recovery from '../../backend/models/Recovery';
// <Route path="recover/:recoverId" element={<Recovery} />

const ENV = process.env.REACT_APP_ENV
const PROD_HOST_IP = process.env.REACT_APP_PROD_HOST_IP

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = ENV === 'prod' ? `http://${PROD_HOST_IP}/` : 'http://localhost/';
  // axios.defaults.baseURL = 'http://localhost/';
  // const { PROD_HOST_IP } = process.env
  // axios.defaults.baseURL = `http://${PROD_HOST_IP}:3050`;

  const user = useSelector((state) => state.user.user.username);
  const role = useSelector((state) => state.user.user.role)

  const isMdOrAbove = useMediaQuery((theme) => theme.breakpoints.up('md'));

  useEffect(() => {
    setDrawerOpen(isMdOrAbove);
  }, [isMdOrAbove]);

  const [isHidden, setIsHidden] = useState(false)

  const toggleHidden = () => {
    console.log(user)
    setIsHidden(!isHidden)
  }

  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <div className="App">
      {user ? <>
        <Grid container spacing={1}>
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
              {role === 'user' && <Routes>
                <Route path="welcome" element={<Welcome />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="jobsite" element={<JobsiteList />} />
                <Route path="jobsites" element={<JobsiteList />} />
                <Route path="Timecard" element={<OLDTimecardList />} />
                <Route
                  path="timecardsearchpage"
                  element={<TimecardSearchPage />}
                />
                <Route
                  path="Timecard/create"
                  element={<TimecardCreatePage />}
                />

                <Route path="/" element={<Dashboard />} />
              </Routes>}
              {role === 'admin' || role === 'demoAdmin' ? <Routes>
                <Route path="welcome" element={<Welcome />} />
                <Route path="jobsite/create" element={<JobsiteCreatePage />} />
                <Route path="jobsite" element={<JobsiteList />} />
                <Route path="jobsites" element={<JobsiteList />} />
                <Route path="createactivation" element={<Createactivation />} />
                <Route path='TimecardExcel' element={<TimecardExcel />} />
                <Route path='report' element={<DisplayReport />} />


                <Route path="/" element={<Dashboard />} />
              </Routes> : <></>}
            </Container>
          </Grid>
          <Grid item xs={0} sm={0} md={0} lg={0} xl={0}></Grid>
        </Grid>
      </> : <> {/* public routes */}
        <Container>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signup/:activationLink" element={<Signup />} />
            <Route path='newuser/:email/:activationKey' element={<NewUser />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signup/:activationId" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      </>}
    </div>
  );
}

export default App;

//<Route path='*' element={<Login />} />
