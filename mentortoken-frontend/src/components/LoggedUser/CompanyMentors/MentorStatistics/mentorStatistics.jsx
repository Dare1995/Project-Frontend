import React, { useState } from "react";
import UserStats from "../../UserStats/userStats.jsx";
import AssignedJobs from "../../AssignedJobs/assignedJobs.jsx";
import PendingJobOffers from "../PendingJobOffers/pendingJobOffers.jsx";
import "./mentorStatistics.css";

const MentorStatistics = ({mentorId, handleExitMentor}) => {
const [refreshPending, setRefreshPending] = useState(false);

const refreshFetch = () => {
setRefreshPending(!refreshPending);
};
  return (
    <div className="mentor-statistics">
          <UserStats title={"company"} mentorId={mentorId} handleExitMentor={handleExitMentor} refreshFetch={refreshFetch}/>
          <div className="mentor-statistics-job-section">
            <div className="job-section-left">
              <AssignedJobs mentorId={mentorId} renewData={refreshPending}/>
            </div>
            <div className="job-section-right">
              <PendingJobOffers mentorId={mentorId} refreshPending={refreshPending} refreshFetch={refreshFetch}/>
            </div>
        </div>
    </div>
  )
}

export default MentorStatistics