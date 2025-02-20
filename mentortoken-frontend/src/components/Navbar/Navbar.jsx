import { Link } from "react-router-dom"
import "./Navbar.css"
import MentorLogo from "../../images/mentortoken-logo.svg?react"
import Button from "../Button/Button";
import rightArrow from "../../images/arrow-right.svg"

const Navbar = () => {

    return (
        <header>
            <Link to="/"><MentorLogo /></Link>

            <nav>
                <ul>
                    <li>
                        <Link to="/" style={{ color: "#696CFF" }}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>

            <div className="header-login">
                <Link to="/login">Login</Link>
                <Link to="/login">
                    <Button name={"Get Started"} img_src={rightArrow} />
                </Link>
            </div>

        </header>
    );
};

export default Navbar