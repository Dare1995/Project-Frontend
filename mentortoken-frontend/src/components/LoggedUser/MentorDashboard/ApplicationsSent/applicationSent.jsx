import { useEffect, useState } from "react";
import ApplicationSentCard from "../../CompanyMentors/ApplicationSentCard/applicationSentCard";
import "./applicationSent.css";

const ApplicationsSent = ({ renewData }) => {
  const [cardData, setCardData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobAplications, setJobAplications] = useState([]);
  const [token, setToken] = useState('');

  const fetchMentorAssignedJobs = async () => {
    try {
      const aplicationResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/mentor/application/null/pending`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const aplicationData = await aplicationResponse.json()
      setJobAplications(aplicationData);
      const idList = aplicationData.map(application => application.jobId)
      if (idList.length > 0) {
        const allJobs = await fetch(`${import.meta.env.VITE_API_URL}/api/job/ids/${idList}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const allJobsRecived = await allJobs.json();
        setJobs(allJobsRecived);
      }
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  useEffect(() => {
    const tokken = localStorage.getItem("jwt_token");
    setToken(tokken);
  }, []);

  useEffect(() => {
    if (token !== '') {
      fetchMentorAssignedJobs();
    }
  }, [renewData, token]);

  useEffect(() => {
    const jobsData = jobAplications.map((aplication, i) => {
      const job = jobs.find(job => job._id ===
        aplication.jobId &&
        aplication.acceptedStatus === 'pending' &&
        aplication.applicationType === 'mentorToCompany');
      if (job) {
        return {
          title: job.title,
          jobId: job._id,
          aplicationId: aplication._id,
          createdAt: aplication.createdAt
        };
      } else {
        return null;
      }
    }).filter(job => job !== null);

    setCardData(jobsData);

  }, [jobs])

  return (
    <div className='aplications-sent'>
      <h2>Aplications sent</h2>
      <p>Jobs you have applied to</p>

      <div className="aplications-sent-list">
        {cardData.length > 0 ?
          cardData.map((job, i) => (
            <ApplicationSentCard
              key={job.jobId}
              id={job.jobId}
              job={job}
            />
          )) : <ApplicationSentCard />
        }
      </div>
    </div>
  )
}

export default ApplicationsSent

