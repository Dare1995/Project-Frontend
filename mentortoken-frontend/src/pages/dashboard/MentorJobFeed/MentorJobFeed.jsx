import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CompanyCard from "../../../components/LoggedUser/MentorJobFeed/CompanyCard/companyCard.jsx"
import DropdownIcon from "../../../images/loginpage/dropdown-Icon.jsx"
import FiltersManu from "../../../images/loginpage/filter-menu.jsx"
import SquareShape from "../../../images/loginpage/CombinedSquareShape.jsx"
import ParalelShape from "../../../images/loginpage/CombinedParalelShape.jsx"
import ViewMore from "../../../components/LoggedUser/MentorJobFeed/ViewJob/viewJob.jsx"
import "./MentorJobFeed.css"

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const MentorJobFeed = () => {
  const [allCompanies, setAllCompanies] = useState([]);
  const [company, setCompany] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [sortedCompanyJobs, setSortedCompanyJobs] = useState([]);
  const [sortBySelected, setSortBySelected] = useState(false);
  const [categorySelected, setCategorySelected] = useState(false);
  const [companyFiltersSelected, setCompanyFiltersSelected] = useState(false);
  const [sortBySelection, setSortBySelection] = useState("Newest");
  const [categorySelection, setCategorySelection] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [viewGrid, setViewGrid] = useState(true);
  const [editCart, setEditCart] = useState(false);
  const [jobApply, setJobApply] = useState({});

  const [token, setToken] = useState("");

  const query = useQuery();

  const getCompanyById = async (id) => {
    try {
      const companyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/companyId/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const company = await companyResponse.json();
      handleCompanyFilter(company, company.name);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  const getOpenCompaniesJobs = async () => {
    try {
      const jobsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/job/allCompanies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const allJobs = await jobsResponse.json();
      setJobs(allJobs);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  const getOpenJobsByCompany = async (companyId) => {
    try {
      const jobsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/job/all/${companyId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const allJobs = await jobsResponse.json();
      setJobs(allJobs);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  const getCompanies = async (query = "") => {
    try {
      const companiesResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/companies${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const allCompanies = await companiesResponse.json();
      setAllCompanies(allCompanies);
      setCompany(allCompanies);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  const handleSortSelection = (e, selection) => {
    e.preventDefault();
    setSortBySelection(selection);
  };

  const handleCategorySelection = (e, selection) => {
    e.preventDefault();
    setCategorySelection(selection);
    setSortBySelected(false);
  };

  const handleCompanyFilter = (newCompany, newCompanyName) => {
    setSortBySelected(false);
    setCategorySelected(false);
    setCompanyFiltersSelected(false);
    setJobs([]);

    if (newCompany !== "all") {
      setCompany([newCompany]);
      getOpenJobsByCompany(newCompany._id);
    } else if (newCompany === "all") {
      setCompany(allCompanies);
      getOpenCompaniesJobs();
    }
    setCompanyFilter(newCompanyName);
  };


  const handleGridView = () => {
    setViewGrid(!viewGrid);
    setCompanyFiltersSelected(false);
    setCategorySelected(false);
    setSortBySelected(false);
    console.log(viewGrid);
  };

  const handleViewMore = (job = undefined) => {
    setEditCart(!editCart);
    // console.log(job);
    if (job && job !== ("Aplication already created for this job" || "Aplication was created")) {
      setJobApply(job);
    }
  };

  useEffect(() => {
    const tokken = localStorage.getItem("jwt_token");
    setToken(tokken);
  }, []);

  useEffect(() => {
    if (token !== "") {
      getCompanies();
      if (query.get("companyId") !== null) {
        getCompanyById(query.get("companyId"));
      } else {
        getOpenCompaniesJobs();
      }
    }
  }, [token]);

  useEffect(() => {
    const jobsData = jobs.map((job) => {
      const jobCompany = company.find((comp) => comp._id === job.companyId);
      if (jobCompany) {
        return {
          name: jobCompany.name,
          image: jobCompany.image,
          jobId: job._id,
          companyId: job.companyId,
          title: job.title,
          description: job.description,
          category: job.category,
          skillsRequired: job.skillsRequired,
          updated: job.updatedAt,
        };
      } else {
        return null;
      }
    }).filter(job => job !== null);
    setCompanyJobs(jobsData);
  }, [jobs, company]);

  useEffect(() => {
    let sortedJobs = [...companyJobs];

    if (categorySelection !== "all") {
      sortedJobs = sortedJobs.filter(job => job.category === categorySelection);
    }

    if (sortBySelection === "Newest") {
      sortedJobs = sortedJobs.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (sortBySelection === "Oldest") {
      sortedJobs = sortedJobs.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    } else if (sortBySelection === "A - Z") {
      sortedJobs = sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBySelection === "Z - A") {
      sortedJobs = sortedJobs.sort((a, b) => b.title.localeCompare(a.title));
    }
    setSortedCompanyJobs(sortedJobs);
  }, [sortBySelection, companyJobs, categorySelection]);


  return (
    <div className="mentor-job_feed">
      {editCart && <ViewMore job={jobApply} image={jobApply.image} handleViewMore={handleViewMore} />}
      <div className="company-jobs">
        <h2>Your Startup Jobs</h2>
        <div className="job-feed-filter-section">
          <div className="sorting-section">
            <div className="sort-by-section"
              onClick={() => {
                setSortBySelected(!sortBySelected),
                  setCategorySelected(false),
                  setCompanyFiltersSelected(false);
              }}
            >
              {sortBySelected ? <div className="drop-down-selection">
                <p onClick={(e) => handleSortSelection(e, "A - Z")}>Job name: A - Z</p>
                <p onClick={(e) => handleSortSelection(e, "Z - A")}>Job name: Z - A</p>
                <p onClick={(e) => handleSortSelection(e, "Newest")}>Created: Newest</p>
                <p onClick={(e) => handleSortSelection(e, "Oldest")}>Created: Oldest</p>
              </div> : null}
              <p>Sort by:</p>
              <span>{sortBySelection}</span>
              <DropdownIcon
                direction={sortBySelected}
              />
            </div>
            <div className="sort-by-section"
              onClick={() => {
                setCategorySelected(!categorySelected),
                  setSortBySelected(false),
                  setCompanyFiltersSelected(false);
              }}
            >
              {

                categorySelected ? <div className="drop-down-selection">
                  <p onClick={(e) => handleCategorySelection(e, "all")}>All</p>
                  <p onClick={(e) => handleCategorySelection(e, "software")}>Software</p>
                  <p onClick={(e) => handleCategorySelection(e, "finance")}>Finance</p>
                  <p onClick={(e) => handleCategorySelection(e, "sciense")}>Sciense</p>
                  <p onClick={(e) => handleCategorySelection(e, "marketing")}>Marketing</p>
                  <p onClick={(e) => handleCategorySelection(e, "other")}>Other</p>
                </div> : null}
              <p>Category:</p>
              <span>{categorySelection}</span>
              <DropdownIcon
                direction={categorySelected}
              />
            </div>
          </div>
          <div className="sorting-section">
            <div className="sort-by-section"
              onClick={() => {
                setCompanyFiltersSelected(!companyFiltersSelected),
                  setCategorySelected(false),
                  setSortBySelected(false);
              }}
            >
              {companyFiltersSelected ? <div className="drop-down-selection">
                <p key={"all"} onClick={(e) => handleCompanyFilter("all", "all")}>All</p>
                {allCompanies.map(company =>
                  <p key={company._id} onClick={(e) => handleCompanyFilter(company, company.name)}>{company.name}</p>
                )

                }
              </div> : null}
              <FiltersManu />
              <p>Company:</p>
              <span>{companyFilter}</span>
            </div>
            <div className="sort-by-section"
              onClick={handleGridView}
            >
              {viewGrid ? <SquareShape /> : <ParalelShape />}
            </div>
          </div>
        </div>
        <div className="company-job-feed">
          {
            sortedCompanyJobs.map((job) => (

              <CompanyCard key={job.jobId} viewGrid={viewGrid} job={job} handleViewMore={handleViewMore} />
            ))
          }

        </div>
      </div>
    </div>
  );
};

export default MentorJobFeed