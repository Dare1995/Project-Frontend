import React, { useEffect, useState } from "react";
import PhotoCam from "../../../images/loginpage/PhotoCircle.svg";
import LoggedUser from "../../../images/loginpage/loggeduser.svg";
import LinkedinLogo from "../../../images/loginpage/linkedin-logo.svg";
import MailLogo from "../../../images/loginpage/mail.svg";
import PhoneLogo from "../../../images/loginpage/phone.svg";
import EditIcon from "../../../images/loginpage/edit_icon.svg";
import ShapePlus from "../../../images/loginpage/ShapePlus.svg";
import ArrowLeft from "../../../images/arrow-left.svg";
import CreateNewJob from "../CreateNewJob/createNewJob";
import "./userStats.css";

const UserStats = ({ title = "mentor", handleEditMentor, handleExitMentor, edit, mentorId = null, refreshFetch }) => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [userDataSkills, setUserDataSkills] = useState([]);
  const [offerJob, setOfferJob] = useState(false);
  
  const getUser = async () => {
    try {
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await userResponse.json();
      setUserData(data);
      setUserDataSkills(data.skills);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  const getMentor = async (mentor) => {
    try {
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/mentorId/${mentor}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await userResponse.json();
      setUserData(data);
      setUserDataSkills(data.skills);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  const editUser = (e) => {
    e.preventDefault();
    handleEditMentor(userData);
  };

  const handleDirectJob = () => {
    setOfferJob(!offerJob);
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    handleExitMentor();
  };


  useEffect(() => {
    const storedToken = localStorage.getItem("jwt_token");
    setToken(storedToken);
  }, [])

  useEffect(() => {
  if (token !== "" && title === "mentor") {
      getUser();
    } else if (token !== "" && title === "company" && mentorId) {
      getMentor(mentorId);
    }
  }, [edit, token, refreshFetch]);


  return (
    <>
      {offerJob ? <div className="sendDitrectAplication">
        <CreateNewJob exitEdit={handleDirectJob} mentorId={mentorId} refreshFetch={refreshFetch} />
      </div> : null}
      <div className="user-stats">
        {
          title === "mentor" ?
            <h2>My Stats</h2> :
            <div className="mentor-back-btn">
              <button
                type="button"
                onClick={(e) => handleGoBack(e)}
              ><img src={ArrowLeft} ></img>All Mentors</button>
            </div>
        }

        <div className="user-stats-section">
          <div className="user-stats-card">
            <div className="stats-card-photo">
              <img className="photo-stats-card" src={userData.image ? userData.image : PhotoCam} alt="user"></img>
              <img className="photo-stats-status" src={LoggedUser} alt="status"></img>
            </div>

            <div className="card-items">
              <div className="name-linkedin">
                <h2>{userData.name}</h2>
                <img className="linkedin-logo" src={LinkedinLogo} alt="linkedin"></img>
              </div>
              <span className="user-stats-desc">{userData.role}</span>

              <div className="user-stats-email-phone">
                <img className="linkedin_logo" src={MailLogo} alt="mail"></img>
                <span>{userData.email}</span>
              </div>

              <div className="user-stats-email-phone">
                <img className="linkedin_logo" src={PhoneLogo} alt="phone"></img>
                <span>{userData.phone}</span>
              </div>
            </div>
          </div>

          <div className="user-about-section">
            <div className="about-edit">
              {
                title === "mentor" ?
                  <span>About</span> :
                  <span>About Mentor</span>
              }
              {
                title === "mentor" ?
                  <img onClick={(e) => editUser(e)} className="photo-stats-card" src={EditIcon}></img>
                  :
                  <button
                    className="stats-card-button"
                    type="button"
                    onClick={() => { handleDirectJob() }}
                  >
                    <img src={ShapePlus} />Offer New Job</button>
              }
            </div>

            <div className="about-skills">
              <span>Skills:</span>
              {userDataSkills && userDataSkills.map((skill, i) => (
                <React.Fragment key={i}>
                  {i !== 0 && <span className="span_line">|</span>}
                  <span>{skill}</span>
                </React.Fragment>
              ))}
            </div>
            <p>{userData.desc}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStats