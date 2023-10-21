import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/slices/userSlice";
import { setTimecard } from "../features/slices/timecardSlice";
import { setJobsite } from "../features/slices/jobsiteSlice";
import { setRecentTimecards } from "../features/slices/recentTimecardsSlice";

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("🧱USERNAME: ", username);
    axios
      .post('/api/auth/login', {
        
        username: username,
        password: password,
      })
      .then(res => {
        console.log(res);
        
        dispatch(setUser(res.data.user));
        dispatch(setRecentTimecards(res.data.recentTimecards));
        dispatch(setJobsite(res.data.jobsite));
        console.log(res.data.recentTimecards);

        navigate("/dashboard", { replace: true })
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div>
      <p>Login</p>
      <div className="login-container">
        <TextField
          label="username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <br />
        <br />
        <TextField
          id="outlined-password-input"
          label="Password"
          variant="outlined"
          autoComplete="current-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <br />
        <Button onClick={handleSubmit} variant="contained">
          Log In here
        </Button>

      </div>
    </div>
  )
}

export default Login