import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../features/slices/userSlice';


const Recovery = () => {
    const { recoverId } = useParams();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('/')
    }, [])

    return (
        <div>Recovery</div>
    )
}

export default Recovery