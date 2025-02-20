import { useEffect, useState } from "react";
import MentorReviewCard from "../MentorReviewCard/mentorReviewCard.jsx";
import "./mentorCard.css";

const MentorCardBox = ({ handleViewMentor }) => {
    const [token, setToken] = useState(``);
    const [allMentors, setAllMentors] = useState([]);

    const fetchAllMentors = async () => {
        try {
            const mentorsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/mentors`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const mentors = await mentorsResponse.json()
            setAllMentors(mentors);
            console.log(mentors);
        } catch (error) {
            console.log("This is the error: ", error);
        }
    };

    useEffect(() => {
        setToken(localStorage.getItem("jwt_token"));
    }, []);

    useEffect(() => {
        if (token !== "") {
            fetchAllMentors();
        }
    }, [token]);
    return (
        <div className="mentor-card-box">
            {
                allMentors.length > 0 ?
                    allMentors.map(mentor => <MentorReviewCard mentor={mentor} handleViewMentor={handleViewMentor} key={mentor._id} />) :
                    <MentorReviewCard />
            }
        </div>
    )
}

export default MentorCardBox