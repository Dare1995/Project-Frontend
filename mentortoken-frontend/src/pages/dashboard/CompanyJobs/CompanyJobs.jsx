import { useEffect, useState } from "react"
import CompanyCard from "../../../components/LoggedUser/MentorJobFeed/CompanyCard/companyCard";
import CreateNewJob from "../../../components/LoggedUser/CreateNewJob/createNewJob";
import ShapePlus from "../../../images/loginpage/ShapePlus.svg";
import "./CompanyJobs.css"

const CompanyJobs = () => {
    const [companyJobs, setCompanyJobs] = useState([]);
    const [company, setCompany] = useState({});
    const [offerJob, setOfferJob] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        if (token === "") {
            setToken(localStorage.getItem("jwt_token"));
        }
    }, []);

    const fetchCompany = async () => {
        try {
            const myUser = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const userData = await myUser.json();
            setCompany(userData);
        } catch (error) {
            console.log("This is the error: ", error);
        }
    };

    const getOpenCompanyJobs = async () => {
        try {
            const jobsData = await fetch(`${import.meta.env.VITE_API_URL}/api/job/company/open`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const jobs = await jobsData.json();
            setCompanyJobs(jobs);
        } catch (error) {
            console.log("This is the error: ", error);
        }
    };

    const handleOpenJob = () => {
        setOfferJob(!offerJob);
    };

    useEffect(() => {
        if (token !== "" && companyJobs.length === 0) {
            fetchCompany();
            getOpenCompanyJobs();
        }
    }, [token]);

    return (
        <>
            {offerJob ? <div className="send-open-application">
                <CreateNewJob exitEdit={handleOpenJob} isDirectJob={false} refreshFetch={() => { }} />
            </div> : null}

            <div className="company-jobs">
                <div className="company-jobs-tittle">

                    <h2>Your Startup Jobs</h2>
                    <button
                        className="stats-card-button"
                        type="button"
                        onClick={() => { handleOpenJob() }}
                    ><img src={ShapePlus} />Create New Job</button>
                </div>

                <div className="company-job-list">
                    {
                        companyJobs.length > 0 ?
                            companyJobs.map(job => <CompanyCard key={job._id} job={job} user={"company"} company={company} />)
                            :
                            <CompanyCard user={"company"} />
                    }

                </div>
            </div>
        </>
    );
};

export default CompanyJobs