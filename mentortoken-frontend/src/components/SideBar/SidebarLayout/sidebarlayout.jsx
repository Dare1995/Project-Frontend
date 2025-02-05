import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Logo from "../../MentorTokenLogo/logo";
import SideIcon from "../sideicon";
import StatsIcon from "../statsicon";
import LoguotIcon from "../LogoutIcon/logoutIcon.jsx";
import JobFeedIcon from "../jobfeedicon.jsx";
import MentorsIcon from "../mentorsicon.jsx";
import DashboardIcon from "../dashboardicon.jsx";
import PhotoCam from "../../../images/loginpage/PhotoCam.svg";
import SearchBar from "../../Searchbar/searchbar.jsx";
import "./sidebarlayout.css";

const SidebarLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebar, setSidebar] = useState(true);
  const [navigation, setNavigation] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [editImg, setEditImg] = useState(false);
  const [image, setImage] = useState("");

  const fetchUser = async () => {
    try {
      const myUser = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await myUser.json();
      setUser(userData);
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  const editImage = async (picture) => {
    try {
      const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          image: picture,
        }),
      });
      await userResponse.json();
    } catch (error) {
      console.log("This is the error: ", error);
    }
  };

  useEffect(() => {
    setNavigation(location.pathname);
    const storedToken = localStorage.getItem("jwt_token");
    if (storedToken && !token) {
      const decoded = jwtDecode(storedToken);
      setToken(storedToken);
      setDecodedToken(decoded);
    }
  }, [location, token]);

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      setImage(user.image || PhotoCam);
      setDecodedToken((prev) => ({ ...prev, name: user.name }));
    }
  }, [user]);

  const updateNav = (e, value) => {
    e.preventDefault();
    setNavigation(value);
    navigate(value);
  };

  const handleSidebar = (e) => {
    e.preventDefault();
    setSidebar(!sidebar);
  };

  const selectPicture = (e) => {
    e.preventDefault();
    setEditImg(!editImg);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        editImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setEditImg(false);
    }
  };

  const renderNavItems = () => {
    if (decodedToken?.type?.toLowerCase() === "mentor") {
      return (
        <ul>
          <li onClick={(e) => updateNav(e, "/mentorDashboard")}>
            <DashboardIcon fillColor={navigation === "/mentorDashboard" ? "#696CFF" : "rgba(86, 106, 127, 1)"} />
            {navigation === "/mentorDashboard" && <div className="show-side"></div>}
          </li>
          <li onClick={(e) => updateNav(e, "/mentorStats")}>
            <StatsIcon fillColor={navigation === "/mentorStats" ? "#696CFF" : "rgba(86, 106, 127, 1)"} />
            {navigation === "/mentorStats" && <div className="show-side"></div>}
          </li>
          <li onClick={(e) => updateNav(e, "/mentorJobFeed")}>
            <JobFeedIcon
              fillColor={navigation === "/mentorJobFeed" ? "#696CFF" : "rgba(86, 106, 127, 1)"}
              type="mentor"
            />
            {navigation === "/mentorJobFeed" && <div className="show-side"></div>}
          </li>
        </ul>
      );
    } else if (decodedToken?.type?.toLowerCase() === "company") {
      return (
        <ul>
          <li onClick={(e) => updateNav(e, "/companyDashboard")}>
            <DashboardIcon fillColor={navigation === "/companyDashboard" ? "#696CFF" : "rgba(86, 106, 127, 1)"} />
            {navigation === "/companyDashboard" && <div className="show-side"></div>}
          </li>
          <li onClick={(e) => updateNav(e, "/companyMentors")}>
            <MentorsIcon fillColor={navigation === "/companyMentors" ? "#696CFF" : "rgba(86, 106, 127, 1)"} />
            {navigation === "/companyMentors" && <div className="show-side"></div>}
          </li>
          <li onClick={(e) => updateNav(e, "/companyJobs")}>
            <JobFeedIcon
              fillColor={navigation === "/companyJobs" ? "#696CFF" : "rgba(86, 106, 127, 1)"}
              type="company"
            />
            {navigation === "/companyJobs" && <div className="show-side"></div>}
          </li>
        </ul>
      );
    }
  };


  return (
    <div className="logged-layout">
      <div className={sidebar ? "sidebar-class-open" : "sidebar-class-closed"}>
        <SideIcon
          direction={sidebar}
          size={"40px"}
          onClick={handleSidebar}
          className={sidebar ? "logo-logo-open" : "logo-logo-closed"}
          alt="Logo"
        />
        <div className="sidebar-nav-class">
          <Logo color={"#696CFF"} textColor={"#566A7F"} />
          <nav>{renderNavItems()}</nav>
        </div>
        <LoguotIcon status={sidebar} />
      </div>
      <div className="dashboard-class">
        <div className="top-navigation-sidebar">
          <div className="search-bar-side">
            <SearchBar accountType={decodedToken?.type} token={token} />
          </div>
          <div className="user-info">
            {editImg && <input type="file" onChange={handleImageUpload} />}
            <img className="user-photo" src={image} onClick={selectPicture} alt="User" />
            <div className="user-info-wrap">
              <span>{decodedToken?.name || "Name not found"}</span>
              <span style={{ color: "rgba(185, 184, 188, 1)" }}>
                {decodedToken?.type?.toLowerCase() === "mentor" && "Mentor"}
                {decodedToken?.type?.toLowerCase() === "company" && "Company"}
              </span>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
