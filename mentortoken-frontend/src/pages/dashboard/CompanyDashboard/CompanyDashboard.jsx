import { useEffect, useState } from "react";
import AssignedJobs from "../../../components/LoggedUser/AssignedJobs/assignedJobs.jsx";
import BestPerfMentors from "../../../components/LoggedUser/BestPerfMentor/bestPerfMentor.jsx";
import Statistics from "../../../components/LoggedUser/Statistics/statistics.jsx";
import "./CompanyDashboard.css";

// const CompanyDashboard = () => {
//     const [token, setToken] = useState(localStorage.getItem("jwt_token") || "");
//     const [filtered, setFiltered] = useState("all");
//     const [selectedMentor, setSelectedMentor] = useState(null); // New state for mentor selection

//     const handleFilteredStats = (filter) => {
//         setFiltered(filter);
//     };

//     return (
//         <div className="company-dashboard">
//             <div className="company-dashboard-left">
//                 <AssignedJobs 
//                     isCompany={true}
//                     handleSelectedFilter={handleFilteredStats}
//                 />
//             </div>
//             <div className="company-dashboard-right">
//                 <BestPerfMentors token={token} selectedMentor={selectedMentor} setSelectedMentor={setSelectedMentor} />
//                 <Statistics filter={filtered} token={token} selectedMentor={selectedMentor} />
//             </div>
//         </div>
//     );
// };

const CompanyDashboard = () => {
    const [jobFilter, setJobFilter] = useState("all");
    const [assignedJobs, setAssignedJobs] = useState([]);
    const [aplications, setAplications] = useState([]);
    const [token, setToken] = useState('');
    const [filtered, setFiltered] = useState("all");
   

    useEffect(() => {
      const storedToken =localStorage.getItem("jwt_token");
      setToken(storedToken);

},[]);

    const handleFilteredStats = ( filter) => {
      setFiltered(filter);
    };

  
    return (
      <div className="company-dashboard">
        <div className="company-dashboard-left">
          <AssignedJobs 
          companyId={true}
          handleSelectedFilter = {handleFilteredStats}
          />
        </div>
        <div className="company-dashboard-right">
          <BestPerfMentors/>
          <Statistics filter={filtered}/>
        </div>
      </div>
    )
  }

export default CompanyDashboard


