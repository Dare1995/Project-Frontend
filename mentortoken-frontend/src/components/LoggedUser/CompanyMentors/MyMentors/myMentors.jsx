import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import QuickOverview from '../../MentorStats/QuickOverview/quickOverview.jsx';
import MentorCard from '../MentorCard/mentorCard.jsx';
import './myMentors.css';

const MyMentors = ({ handleViewMentor }) => {
  const [decodedToken, setDecodedToken] = useState('');
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    const decoded = jwtDecode(storedToken);
    setDecodedToken(decoded);
  }, []);

  return (
    <div className="my-mentors-layout">
      <MentorCard handleViewMentor={handleViewMentor} />
      <div className="company-overview">
        <QuickOverview description={'In the last month'} companyId={decodedToken.id} />
      </div>
    </div>
  )
}

export default MyMentors