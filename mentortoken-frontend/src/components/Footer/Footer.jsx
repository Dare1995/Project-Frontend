import { Link } from "react-router-dom"
import "./Footer.css"
import MentorLogo from "../../images/mentortoken-logo.svg?react"
import LinkedInLogo from "../../images/socialmedia/LinkedInLogo.svg?react"
import TweeterLogo from "../../images/socialmedia/TweeterLogo.svg?react"
import FacebookLogo from "../../images/socialmedia/FacebookLogo.svg?react"

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-logo">
                    <MentorLogo />
                    <p>With Mentor Token, every failure transforms into an opportunity for growth.</p>
                </div>
                <div className="footer-links">
                    <h4>Pages</h4>
                    <p><Link to="/">Home</Link></p>
                    <p><Link to="contact">Contact US</Link></p>
                </div>
                <div className="footer-contact">
                    <h4>Contact</h4>
                    <p>info@mentortoken.com</p>
                    <p>+ (389) 123 456789</p>
                </div>
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <Link> <LinkedInLogo /> </Link>
                        <Link> <TweeterLogo /> </Link>
                        <Link> <FacebookLogo /> </Link>
                    </div>
                </div>
            </div>
            <hr />
            <p className="footer-bottom">
            ©2024 Mentor Token. All right reserved.
            </p>
        </footer>
    );
};



export default Footer;
