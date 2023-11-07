import Container from '@mui/material/Container';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JobsitePage = () => {
  const { jobsiteId } = useParams();
  const [jobsite, setJobsite] = useState({});

  useEffect(() => {
    axios.get(`/api/jobsite/${jobsiteId}`).then((res) => {
      console.log(res);
      setJobsite(res.data);
    });
  }, [jobsiteId]);
  return <Container> you have reached {jobsiteId} </Container>;
};

export default JobsitePage;
