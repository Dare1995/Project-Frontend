import { useEffect, useState } from "react";
import Button from "../../components/Button/Button.jsx";
import rightArrow from "../../images/arrow-right.svg"
import MemberCard from "../../components/MemberCard/memberCard.jsx"
import getMembersData from "../../components/MemberCard/memberFrames.js";
import "./about.css"

const AboutPage = () => {
    
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        setMyData(getMembersData())
    },[]);
    
    return (
        <main>
            <div className="about-header">
                <h1>Meet our team members</h1>
                <p>We Focus on the details of everything we do. All to help businesses around the world
                    Focus on what's most important to them.</p>
                <Button name={"Get in touch"} img_src={rightArrow} />
            </div>
            <div className="members-card">
                {myData.map((person,index) => (
                    <MemberCard person={person} key={index}/>
                ))}
            </div>
        </main>
    )
}

export default AboutPage