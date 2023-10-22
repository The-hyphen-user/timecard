
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';
import Header from './components/Header';
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

function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:5000";
  return (
    <div className="App">
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row', // Set flex direction to column
          height: '100vh', // Set the container height to fill the viewport
        }}
      // sx={{bgcolor: 'primary.main', p:1}}
      >

        <br />
        <Header />
        <div style={{ flex: 1, overflow: 'auto' }}>
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
            <Route path='welcome' element={<Welcome/>} />
            <Route path='createactivation' element={<Createactivation/>} />


            <Route path='/' element={<Home />} />
          </Routes>
        </div>

      </Container>
    </div>
  );
}

export default App;

