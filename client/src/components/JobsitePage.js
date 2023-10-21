import React from 'react'
import { useParams } from "react-router-dom";

const JobsitePage = () => {
    const { jobsiteId } = useParams();
  return (
    <div>JobsitePage for {jobsiteId}
    <br/>
    info on jobsite {jobsiteId}
    <br/>
    list of recent timecards for jobsite {jobsiteId}
    </div>
  )
}

export default JobsitePage