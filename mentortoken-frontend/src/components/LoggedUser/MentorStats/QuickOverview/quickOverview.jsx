// import { useEffect, useState } from "react";
// import "./quickOverview.css";

// const QuickOverview = ({ mentorId = null, companyId = null, handleSelection, description = null }) => {
//   const [selected, setSelected] = useState("all");
//   const [token, setToken] = useState("");
//   const [jobAplications, setJobAplications] = useState([]);
//   const [totalJobs, setTotalJobs] = useState(0);
//   const [assignedJobs, setAssignedJobs] = useState(0);
//   const [totalApplications, setTotalApplications] = useState(0);
//   const [finishedJobs, setFinishedJobs] = useState(0);
//   const [companyAplications, setCompanyApplications] = useState([]);
//   const [totalMentors, setTotalMentors] = useState(0);
//   const [totalAssigned, setTotalAssigned] = useState(0);
//   const [finishCompJobs, setFinishCompJobs] = useState(0);

//   const fetchMentorAssignedJobs = async (mentorId = null, date = null) => {
//     try {
//       const applicationResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/mentor/dateApplications/${mentorId}/${date}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });
//       const applicationData = await applicationResponse.json();
//       setJobAplications(applicationData);
//     } catch (error) {
//       console.log("This is the error: ", error);
//     }
//   };

//   const getCompanyAppsFromDate = async (date) => {
//     try {
//       const applicationResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/company/dateApplications/${date}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       });
//       const applicationData = await applicationResponse.json();
//       setCompanyApplications(applicationData);
//     } catch (error) {
//       console.log("This is the error: ", error);
//     }
//   };

//   useEffect(() => {
//     setToken(localStorage.getItem("jwt_token"));
//   }, []);

//   useEffect(() => {
//     const currentDate = new Date();
//     const year = currentDate.getFullYear();
//     const lastMonth = currentDate.getMonth() - 1; // 0-indexed month
//     const currentDay = currentDate.getUTCDate();

//     const lastMonthDate = new Date(year, lastMonth, currentDay);
//     console.log(lastMonthDate, "From QuickOverview");
//     if (token !== "") {
//       if (companyId === null) {
//         fetchMentorAssignedJobs(mentorId, "null");
//       } else {
//         getCompanyAppsFromDate(lastMonthDate);
//       }
//     }
//   }, [mentorId, token]);

//   useEffect(() => {
//     if (token) {
//       if (jobAplications.length > 0) { // find all jobs (pending, completed and in progress)
//         const jobsTotal = jobAplications.filter(job => job.acceptedStatus !== "rejected");
//         setTotalJobs(jobsTotal.length);
//         const jobsAssigned = jobAplications.filter(job => job.status === "assigned");
//         setAssignedJobs(jobsAssigned.length);
//         const jobsApplied = jobAplications.filter(job => job.applicationType === "mentorToCompany");
//         setTotalApplications(jobsApplied.length);
//         const jobscompleted = jobAplications.filter(job => job.acceptedStatus === "completed");
//         // console.log("Here is the data that shows how much completed jobs is from mentor"); 
//         setFinishedJobs(jobscompleted.length);
//       }
//       if (companyAplications.length > 0) { // find all jobs (pending, completed and in progress)

//         const jobsAssigned = companyAplications.filter(job => job.status === "assigned");
//         setTotalAssigned(jobsAssigned.length);
//         const jobscompleted = companyAplications.filter(job => job.acceptedStatus === "completed");
//         setFinishCompJobs(jobscompleted.length);
//         const mentors = [];
//         companyAplications.forEach((app) => {
//           if (!mentors.includes(app.mentorId)) {
//             mentors.push(app.mentorId);
//           }
//         })
//         // console.log(mentors);
//         setTotalMentors(mentors.length);
//       }
//     }
//   }, [selected, jobAplications, companyAplications]);

//   const handleSelect = (e, select) => {
//     e.preventDefault();
//     setSelected(select);
//     if (companyId === null) {
//       handleSelection(select);
//     }
//   };

//   return (
//     <div className="quick-overview">
//       <h2>Quick Overview</h2>
//       {description ? <span className="overview-desc">{description}</span> : null}
//       {companyId === null ?

//         // Mentor Statistics
//         <div className="overview-display-container">
//           <div
//             onClick={(e) => handleSelect(e, "all")}
//             className={selected === "all" ? "overview-selected" : "overview-display"}
//           >
//             <p>Total Jobs</p>
//             <span>{totalJobs}</span>
//           </div>
//           <div
//             onClick={(e) => handleSelect(e, "assigned")}
//             className={selected === "assigned" ? "overview-selected" : "overview-display"}
//           >
//             <p>Total Assigned Jobs</p>
//             <span>{assignedJobs}</span>
//           </div>
//           <div
//             onClick={(e) => handleSelect(e, "mentorToCompany")}
//             className={selected === "mentorToCompany" ? "overview-selected" : "overview-display"}
//           >
//             <p>Jobs That You Have Applied</p>
//             <span>{totalApplications}</span>
//           </div>
//           <div
//             onClick={(e) => handleSelect(e, "completed")}
//             className={selected === "completed" ? "overview-selected" : "overview-display"}
//           >
//             <p>Finished Jobs</p>
//             <span>{finishedJobs}</span>
//           </div>
//         </div> :

//         // Company Statistics
//         <div className="overview-display-container">
//           <div
//             onClick={(e) => handleSelect(e, "all")}
//             className={selected === "all" ? "overview-selected" : "overview-display"}
//           >
//             <p>Total Mentors</p>
//             <span>{totalMentors}</span>
//           </div>
//           <div
//             onClick={(e) => handleSelect(e, "assigned")}
//             className={selected === "assigned" ? "overview-selected" : "overview-display"}
//           >
//             <p>Total Assigned Jobs</p>
//             <span>{totalAssigned}</span>
//           </div>
//           <div
//             onClick={(e) => handleSelect(e, "completed")}
//             className={selected === "completed" ? "overview-selected" : "overview-display"}
//           >
//             <p>Finished Jobs</p>
//             <span>{finishCompJobs}</span>
//           </div>
//         </div>
//       }
//     </div>
//   )
// }

// export default QuickOverview

import { useEffect, useState } from "react";
import "./quickOverview.css";

const QuickOverview = ({ mentorId = null, companyId = null, handleSelection, description = null }) => {
  const [selected, setSelected] = useState("all");
  const [token, setToken] = useState("");
  const [jobApplications, setJobApplications] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [assignedJobs, setAssignedJobs] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [finishedJobs, setFinishedJobs] = useState(0);
  const [companyApplications, setCompanyApplications] = useState([]);
  const [totalMentors, setTotalMentors] = useState(0);
  const [totalAssigned, setTotalAssigned] = useState(0);
  const [finishCompJobs, setFinishCompJobs] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const lastMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
    const currentDay = currentDate.getUTCDate();
    const lastMonthDate = new Date(year, lastMonth, currentDay);

    const fetchMentorAssignedJobs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/mentor/dateApplications/${mentorId}/null`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setJobApplications(data);
      } catch (error) {
        console.error("Error fetching mentor jobs:", error);
      }
    };

    const getCompanyAppsFromDate = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/company/dateApplications/${lastMonthDate}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCompanyApplications(data);
      } catch (error) {
        console.error("Error fetching company applications:", error);
      }
    };

    if (companyId === null) {
      fetchMentorAssignedJobs();
    } else {
      getCompanyAppsFromDate();
    }
  }, [mentorId, companyId, token]);

  useEffect(() => {
    if (!token) return;

    if (jobApplications.length > 0) {
      setTotalJobs(jobApplications.filter(job => job.acceptedStatus !== "rejected").length);
      setAssignedJobs(jobApplications.filter(job => job.status === "assigned").length);
      setTotalApplications(jobApplications.filter(job => job.applicationType === "mentorToCompany").length);
      setFinishedJobs(jobApplications.filter(job => job.acceptedStatus === "completed").length);
    }

    if (companyApplications.length > 0) {
      setTotalAssigned(companyApplications.filter(job => job.status === "assigned").length);
      setFinishCompJobs(companyApplications.filter(job => job.acceptedStatus === "completed").length);

      const uniqueMentors = new Set(companyApplications.map(app => app.mentorId));
      setTotalMentors(uniqueMentors.size);
    }
  }, [jobApplications, companyApplications]);

  const handleSelect = (e, select) => {
    e.preventDefault();
    setSelected(select);
    if (companyId === null) {
      handleSelection(select);
    }
  };

  return (
    <div className="quick-overview">
      <h2>Quick Overview</h2>
      {description && <span className="overview-desc">{description}</span>}

      {companyId === null ? (
        // Mentor Statistics
        <div className="overview-display-container">
          {[
            { label: "Total Jobs", value: totalJobs, key: "all" },
            { label: "Total Assigned Jobs", value: assignedJobs, key: "assigned" },
            { label: "Jobs That You Have Applied", value: totalApplications, key: "mentorToCompany" },
            { label: "Finished Jobs", value: finishedJobs, key: "completed" },
          ].map(({ label, value, key }) => (
            <div
              key={key}
              onClick={(e) => handleSelect(e, key)}
              className={selected === key ? "overview-selected" : "overview-display"}
            >
              <p>{label}</p>
              <span>{value}</span>
            </div>
          ))}
        </div>
      ) : (
        // Company Statistics
        <div className="overview-display-container">
          {[
            { label: "Total Mentors", value: totalMentors, key: "all" },
            { label: "Total Assigned Jobs", value: totalAssigned, key: "assigned" },
            { label: "Finished Jobs", value: finishCompJobs, key: "completed" },
          ].map(({ label, value, key }) => (
            <div
              key={key}
              onClick={(e) => handleSelect(e, key)}
              className={selected === key ? "overview-selected" : "overview-display"}
            >
              <p>{label}</p>
              <span>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickOverview;
