import { useState } from "react"
import { useLocation } from "react-router-dom"
import MyMentors from "../../../components/LoggedUser/CompanyMentors/MyMentors/myMentors.jsx";
import MentorStatistics from "../../../components/LoggedUser/CompanyMentors/MentorStatistics/mentorStatistics.jsx";
import "./CompanyMentors.css"

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const CompanyMentors = () => {
  const [mentorSelected, setMentorSelected] = useState(null);
  const [directJobForm, setDirectJobForm] = useState(false);

  const query = useQuery();
  const handleViewMentor = (mentor) => {
    setMentorSelected(mentor);
  };


  const handleExitMentor = () => {
    setMentorSelected(null);
  };

  useState(() => {
    setMentorSelected(query.get("mentorId"));
  }, []);


  return (
    <div className="company-mentors">
      {mentorSelected ? <div className="company-mentors-list">
        <MentorStatistics
          mentorId={mentorSelected}
          handleExitMentor={handleExitMentor} />
      </div> :
        <MyMentors handleViewMentor={handleViewMentor} />
      }

      {directJobForm ? <div className="direct-job-screen">hello</div> : null}
    </div>
  )
}

export default CompanyMentors