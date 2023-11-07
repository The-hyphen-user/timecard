// TimecardSearch.jsx
import React from 'react';
import Timecard from './Timecard';

const TimecardSearch = ({ timecards }) => {
  return (
    <div>
      <h3>Timecard Search</h3>
      {timecards
        ? timecards.map((timecard) => (
            <Timecard key={timecard.id} {...timecard} />
          ))
        : null}
    </div>
  );
};

export default TimecardSearch;
