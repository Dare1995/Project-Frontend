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
      setFinishedJobs(jobApplications.filter(job => job.acceptedStatus === "done").length);
    }

    if (companyApplications.length > 0) {
      setTotalAssigned(companyApplications.filter(job => job.status === "assigned").length);
      setFinishCompJobs(companyApplications.filter(job => job.acceptedStatus === "done").length);

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
            { label: "Finished Jobs", value: finishedJobs, key: "done" },
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
            { label: "Finished Jobs", value: finishCompJobs, key: "done" },
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
