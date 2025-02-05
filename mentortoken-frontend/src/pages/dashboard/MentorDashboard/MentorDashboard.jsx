import { useState }  from "react"
import "./MentorDashboard.css"
import AssignedJobs from "../../../components/LoggedUser/MentorDashboard/AssignedJobs/assignedJobs";
import PendingJobs from "../../../components/LoggedUser/MentorDashboard/PendingJobs/pendingJobs";
import ApplicationsSent from "../../../components/LoggedUser/MentorDashboard/ApplicationsSent/applicationSent";


const MentorDashboard = () => {
  const [renewData, setRenewData] = useState(true);

  const handleRenew = () => {
    setRenewData(!renewData);
  }


  return (
    <div className="mentor-dashboard">
      <div className="mentor-dashboard-left">
        <AssignedJobs 
        renewData={renewData}
        />
      </div>
      <div className="mentor-dashboard-right">
        <PendingJobs
        renewData={renewData}
        handleRenew={handleRenew}
        />
        <ApplicationsSent
        renewData={renewData}
        />
      </div>
    </div>
  )
}

export default MentorDashboard
