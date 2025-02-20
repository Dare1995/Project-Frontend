import unsplashScreen from "../../images/homepage/unsplashScene.png"
import Button from "../../components/Button/Button"
import rightArrow from "../../images/arrow-right.svg"
import { Link } from "react-router-dom";
import "./HeroImage.css"


const HeroImage = () => {
    return (
        <div className="heroimage-container">
            <img className="unsplash-screen" src={unsplashScreen} alt="unsplash-screen" />
            <div className="heroimage-content">
                <div className="heroimage-text">
                    <h1>Grow your StartUp! Monitoring and Evaluating now is easy!</h1>
                    <p>
                        Welcome to Mentor Token, where we redefine the dynamics of start-up success.
                        Our innovative platform offers a transformative approach to mentorship,
                        ensuring that mentors are not just engaged but motivated to drive the success of the ventures they support.
                    </p>
                </div>
                <div className="heroimage-button">
                    <Link to="/login">
                        <Button name={"Get Started"} img_src={rightArrow} />
                    </Link>
                    <p>Get in Touch</p>
                </div>
            </div>
        </div>
    );
};

export default HeroImage;

