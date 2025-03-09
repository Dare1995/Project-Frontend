import { useEffect, useState } from "react";
import AssignedJobs from "../../../components/LoggedUser/AssignedJobs/assignedJobs.jsx";
import BestPerfMentors from "../../../components/LoggedUser/BestPerfMentor/bestPerfMentor.jsx";
import Statistics from "../../../components/LoggedUser/Statistics/statistics.jsx";
import "./CompanyDashboard.css";

const CompanyDashboard = () => {
  const [token, setToken] = useState('');
  const [filtered, setFiltered] = useState("all");


  useEffect(() => {
    if (token === "") {
      setToken(localStorage.getItem("jwt_token"));
    }
  }, []);

  const handleFilteredStats = (filter) => {
    setFiltered(filter);
  };


  return (
    <div className="company-dashboard">
      <div className="company-dashboard-left">
        <AssignedJobs
          companyId={true}
          handleSelectedFilter={handleFilteredStats}
        />
      </div>
      <div className="company-dashboard-right">
        <BestPerfMentors />
        <Statistics filter={filtered} />
      </div>
    </div>
  )
}

export default CompanyDashboard


