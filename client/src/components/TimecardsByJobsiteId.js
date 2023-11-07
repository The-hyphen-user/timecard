//section of recent timecards based on a user and jobsite
//displayed on the timecard list page in the 3rd row

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import TimecardCard from './TimecardCard';
import { addJobsiteTimecards } from '../features/slices/timecardsSlice'


const TimecardsByJobsiteId = () => {
  const dispatch = useDispatch();

  const selectedJobsite = useSelector((state) => state.jobsites.selectedJobsite)
  // const timecardByJobsiteId = useSelector((state) => state.timecardByJobsiteId.timecards)
  const jobsiteTimecards = useSelector(
    (state) => state.timecards.jobsiteTimecards,
  );
  const [timecards, setTimecards] = useState([]);

  useEffect(() => {
    if (selectedJobsite._id === null) {
      setTimecards([]);
    } else {
      const isJobsiteIdInTimecards = jobsiteTimecards.some(
        (timecards) => timecards.jobsiteId === selectedJobsite._id,
      );
      if (isJobsiteIdInTimecards) {
        setTimecards(
          jobsiteTimecards.find(
            (timecards) => timecards.jobsiteId === selectedJobsite._id,
          ).timecards,
        );
        console.log('setting timecards to', timecards);
      } else {
        axios
          .get('/api/timecard/search/jobsite', {
            params: { jobsiteId: selectedJobsite._id },
          })
          .then((res) => {
            console.log('timecards responce:', res.data)
            setTimecards(res.data.timecards)
            dispatch(addJobsiteTimecards({
              jobsiteId: selectedJobsite._id,
              timecards: res.data.timecards
            }))
          })
      }
    }
  }, [selectedJobsite, jobsiteTimecards]);

  return (
    <div>
      {timecards.map((timecard) => (
        <TimecardCard key={timecard._id} timecard={timecard} jobsiteName={selectedJobsite.name} />
      ))}
    </div>
  )
}

export default TimecardsByJobsiteId;
