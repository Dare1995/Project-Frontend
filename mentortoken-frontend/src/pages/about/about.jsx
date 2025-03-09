import { useEffect, useState } from "react";
import Button from "../../components/Button/Button.jsx";
import rightArrow from "../../images/arrow-right.svg";
import MemberCard from "../../components/Aboutpage/memberCard.jsx";
import getMembersData from "../../components/Aboutpage/memberData.jsx";
import { Link } from "react-router-dom";
import "./about.css";

const AboutPage = () => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        setMyData(getMembersData());
    }, []);

    return (
        <main>
            <div className="about-header">
                <h1>Meet our team members</h1>
                <p>
                    We focus on the details of everything we do. All to help businesses around the world
                    focus on what's most important to them.
                </p>
                <Link to="/contact">
                    <Button name={"Get in touch"} img_src={rightArrow} />
                </Link>
            </div>
            <div className="members-card">
                {myData.map((person, index) => (
                    <MemberCard person={person} key={index} />
                ))}
            </div>
        </main>
    );
};

export default AboutPage;
