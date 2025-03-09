import React, { useState }  from "react"
import UserStats from "../../../components/LoggedUser/UserStats/userStats.jsx"
import Statistics from "../../../components/LoggedUser/Statistics/statistics.jsx"
import QuickOverview from "../../../components/LoggedUser/MentorStats/QuickOverview/quickOverview.jsx"
import EditMentor from "../../../components/LoggedUser/MentorStats/EditMentor/editMentor.jsx"
import "./MentorStats.css"

const MentorStats = () => {
  const [filtered, setFiltered] = useState("all");
  const[ editMentor, setEditMentor] = useState(false);
  const [mentorData, setMentorData] = useState({});

  const handleStatisticFilter = (selection) => {
    setFiltered(selection);
  }

  const handleEditMentor = (userData) => {
    setMentorData(userData);
    setEditMentor(!editMentor);
  }

  return (
    <div className="mentor-stats">
      { editMentor && <EditMentor handleEditMentor={handleEditMentor} user={mentorData}/>}
      <div className="mentor-stats_upper">
      <UserStats handleEditMentor={handleEditMentor} edit={editMentor}/>
      </div>
      <div className="mentor-stats_lower">
        <div className="mentor-performance">
        <Statistics filter={filtered}/>
        </div>
        <div className="mentor-overview">
          <QuickOverview handleSelection={handleStatisticFilter}/>
        </div>
      </div>
    </div>
  
  )
}

export default MentorStats