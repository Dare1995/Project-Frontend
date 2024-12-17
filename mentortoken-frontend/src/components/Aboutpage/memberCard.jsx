import { Link } from "react-router-dom"
import FacebookSocial from "../../images/aboutpage/facebooksocial.svg"
import GithubSocial from "../../images/aboutpage/githubsocial.svg"
import LinkedInSocial from "../../images/aboutpage/linkedinsocial.svg"
import "./memberCard.css"


const MemberCard = ({ person }) => {
    const { img, name, position, aboutMe, gitHub, linkedIn, facebook } = person;
    return (

        <div className="member-card" >
            <img src={img} alt={name} />
            <h3>{name}</h3>
            <h4>{position}</h4>
            <p>{aboutMe}</p>

            <div className="member-social">
                <Link to={gitHub}><img src={FacebookSocial}></img></Link>
                <Link to={linkedIn}><img src={GithubSocial}></img></Link>
                <Link to={facebook}><img src={LinkedInSocial}></img></Link>
            </div>
        </div>
    )
}

export default MemberCard