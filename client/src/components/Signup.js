import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/slices/userSlice";

const Signup = () => {
  const { inviteLink } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log("🧱USERNAME: ", username);
    axios
      .post('/api/auth/register', {
        username: username,
        email:email,
        password: password,
      })
      .then(res => {
        console.log(res);
        
        dispatch(setUser(res.data.user));

        navigate("/welcome", { replace: true })
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div>
    <p>Signup</p>
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
        label="email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
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

    </div></div>
  )
}

export default Signup