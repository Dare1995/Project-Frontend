import FeatureCard from "./featureCard"
import Rocket from "../../../images/Rocket.svg"
import rocketIcon from "../../../images/homepage/rocketIcon.png"
import analyticsIcon from "../../../images/homepage/analyticsIcon.png"
import rewardIcon from "../../../images/homepage/rewardIcon.png"
import libraryIcon from "../../../images/homepage/libraryIcon.png"
import "./features.css"

const Features = () => {
    return (
        <div className="features-container">
            <img className="rocket" src={Rocket} alt="rocket" />
            <h4>FEATURES</h4>
            
            <div className="features-about">
                <p>Boost Your Startup's Journey: <br />
                Discover Mentor Token's Robust <br />
                Features</p>
            </div>
            
            <div className="features-card-container">
            <FeatureCard 
            logo={rocketIcon}
            name="Goal Setting"
            task="Set clear and achievable goals for your startup's success."
            />
            <FeatureCard 
            logo={analyticsIcon}
            name="Performance Tracking"
            task="Monitor mentor performance in real-time and track progress."
            />
             <FeatureCard 
            logo={rewardIcon}
            name="Reward System"
            task="Motivate mentors with a secure and rewarding token-based reward system."
            />
             <FeatureCard 
            logo={libraryIcon}
            name="Knowledge Library"
            task="Access a comprehensive knwledge library to equip mentors with the skills, and motivation."
            />
            </div>
        </div>
    );
};

export default Features