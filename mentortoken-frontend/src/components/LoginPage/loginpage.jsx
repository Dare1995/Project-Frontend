import { Link } from "react-router-dom"
import LoginBackground from "../../images/loginpage/VectaryTexture.png"
import MentorTokenLogo from "../MentorTokenLogo/logo.jsx"
import Rocket from "../../images/Rocket.svg"
import MentorLogo from "../../images/logo.svg"
import "./loginpage.css"

const LoginComponent = ({ logData }) => {
    return (
        <div className="login-page-container">
            <img className="login-background" src={LoginBackground} alt="login-background" />
            <div className="login-page-info">
                <div>
                    <h1>GROW<br />YOUR STARTUP!</h1>
                    <span>MONITORING AND EVALUATING NOW IS EASY!</span>
                </div>
                <div className="login-page-logo">
                    <Link><MentorTokenLogo color={"white"} /></Link>
                    <p>mentortoken.com</p>
                </div>
            </div>
            <div className="login-section">
                <img className="login-rocket" src={Rocket} alt="rocket-image" />
                <Link to="/"><img className="mentor-logo-img" src={MentorLogo} alt="mentor-logo" /></Link>
                <div className="login-page-components">
                    {logData}
                </div>
            </div>
        </div>
    );
};

export default LoginComponent