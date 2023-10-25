
import './App.css';
import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import axios from 'axios';
import Header from './components/Sidebar';
import Home from './components/Home'
import Login from './components/Login';
import About from './components/About';
import Signup from './components/Signup';
import User from './components/User'
import Logout from './components/Logout';
import Search from './components/Search';
import Profile from './components/Profile';
import Dashboard from './components/Dashboard';
import JobsiteList from './components/JobsiteList';
import { Container, Typography } from '@mui/material';
import JobsitePage from './components/JobsitePage';
import Welcome from './components/Welcome';
import JobsiteCreatePage from './components/JobsiteCreatePage';
import Createactivation from './components/Createactivation';

import TimecardList from './components/TimecardList';
import TimecardPage from './components/TimecardPage';
import TimecardCreatePage from './components/TimecardCreatePage';
import TimecardEditPage from './components/TimecardEditPage';
import { useSelector } from "react-redux";
import Navbar from './components/Navbar';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';


function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:5000";

  const user = useSelector((state) => state.user.user.username);
  return (
    <div className="App">
      {user ?
        <Grid container spacing={1} >
          <Grid item xs={2} md={2}>
            <Header />
          </Grid>
          <Grid item
            xs={10} md={8}>
            <Container maxWidth="lg">
              <Routes>
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
                <Route path='signup/:activationLink' element={<Signup />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='user' element={<User />}>
                  <Route path='search' element={<Search />} />
                  <Route path='profile' element={<Profile />} />
                </Route>
                <Route path='about' element={<About />} />
                <Route path='home' element={<Home />} />
                <Route path='logout' element={<Logout />} />
                <Route path='jobsite' element={<JobsiteList />} />
                <Route path='jobsites' element={<JobsiteList />} />
                <Route path='jobsite/create' element={<JobsiteCreatePage />} />
                <Route path='jobsite/:jobsiteId' element={<JobsitePage />} />
                <Route path='welcome' element={<Welcome />} />
                <Route path='createactivation' element={<Createactivation />} />
                <Route path='Timecard' element={<TimecardList />} />
                <Route path='Timecard/:timecardId' element={<TimecardPage />} />
                <Route path='Timecard/create' element={<TimecardCreatePage />} />
                <Route path='Timecard/:timecardId/edit' element={<TimecardEditPage />} />
                <Route path='/' element={<Login />} />
              </Routes>
            </Container>
          </Grid>
          
          <Grid item xs={0} md={2}>
          </Grid>

        </Grid>
        :
        <Container>
          <Routes>
            <Route path='/' element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Container>
      }
    </div>
  );
}

export default App;

//<Route path='*' element={<Login />} />
 