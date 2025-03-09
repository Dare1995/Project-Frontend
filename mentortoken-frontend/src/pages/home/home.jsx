import HeroImage from "../../components/HeroImage/HeroImage"
import Companies from "../../components/HomePage/Companies/companies"
import Features from "../../components/HomePage/Features/features"
import MentorToken from "../../images/homepage/mentors-background.png"
import Decoration from "../../images/homepage/decoration.png"
import "./home.css"

const HomePage = () => {

    return (
        <main>
            <HeroImage />
            <Companies />
            <Features />
            <div className="home-bottom">
                <span>Every <strong>success</strong> is rewarded!</span>
                <div className="bottom-image">
                    <img src={MentorToken} alt="mentor-background" />
                    <div className="decoration">
                        <img src={Decoration} alt="decoration-background" />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HomePage