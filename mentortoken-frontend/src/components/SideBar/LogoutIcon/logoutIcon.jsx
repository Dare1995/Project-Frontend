import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./logoutIcon.css"

const LogoutIcon = ({ fillColor = "#696CFF", size = "24", status = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [myToken, setMyToken] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (token) {
      setMyToken(jwtDecode(token));
    }
  }, []);

  useEffect(() => {
    if (myToken.exp) {
      const currentTime = Date.now() / 1000;
      if (currentTime > myToken.exp) {
        localStorage.clear();
        navigate("/");
      }
    }
  }, [location, myToken.exp, navigate]);

  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className={status ? "logout-icon-open" : "logout-icon-closed"}
      onClick={logOut}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          d="M17.44 14.62L20 12.06L17.44 9.5"
          stroke={fillColor}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.76001 12.0596H19.93"
          stroke={fillColor}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4"
          stroke={fillColor}
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p style={{ color: fillColor }}>Logout</p>
    </div>
  );
};

export default LogoutIcon;
