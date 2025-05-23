import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../images/logo.svg";
import Xbtn from "../../../../images/loginpage/x-button.svg";
import "./viewJob.css";

const ViewMore = ({ job, image = Logo, handleViewMore }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [aplicationExist, setApplicationExist] = useState(false);

    const getApplication = async (jobId) => {
        try {
            const applicationResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/mentor/jobApplication/${jobId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (applicationResponse.ok) {
                const application = await applicationResponse.json();
                if (application && application === true) {
                    setApplicationExist(true);
                }
            } else {
                setApplicationExist(false);
            }
        } catch (error) {
            console.log("This is the error: ", error);
        }
    };



    const jobApply = async (e, jobId) => {
        e.preventDefault();

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/mentor/application/${jobId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({}),
            });


            if (response.ok) {
                const responseData = await response.json();
                handleViewMore();
                alert(responseData.message);
            } else {
                const errorData = await response.json();
                handleViewMore();
                alert(errorData.message);
            }

        } catch (error) {
            console.log("This is the error:", error.message);
            handleViewMore();
        }
    };

    const handleNavigateDashboard = (e) => {
        e.preventDefault();
        handleViewMore();
        navigate("/mentorDashboard");
    }

    useEffect(() => {
        if (token === "") {
            setToken(localStorage.getItem("jwt_token"));
        }
    }, []);

    useEffect(() => {
        if (token !== "") {
            getApplication(job.jobId);
        }
    }, [token]);



    return (
        <div className="view-job">
            <div className="view-card">
                <div className="close-icon">
                    <img src={Xbtn} alt="Close" onClick={handleViewMore}></img>
                </div>
                <div className="about-job">
                    <div className="picture-name">
                        <img src={image} />
                        <p>{job.name}</p>
                    </div>
                    <p className="job-name">{job.title}</p>
                    <p className="job-desc">{job.description}</p>
                    {/* <div className="about_skills_required">
                        <span>Skills required:</span>
                        {job.skillsRequired && job.skillsRequired.map((skill, i) => (
                            <React.Fragment key={i}>
                                {i !== 0 && <span className="span_line">|</span>}
                                <span>{skill}</span>
                            </React.Fragment>
                        ))}
                    </div> */}
                    <div className="company-apply-button">
                        {aplicationExist ?
                            <button
                                className="company-apply-button"
                                type="button"
                                onClick={(e) => handleNavigateDashboard(e)}
                            >Aplication is created for this job, check dashboard</button> :
                            <button
                                className="company-apply-button"
                                type="button"
                                onClick={(e) => {
                                    jobApply(e, job.jobId)
                                }}
                            >Apply</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMore