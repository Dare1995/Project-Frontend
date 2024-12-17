import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import InputWithLabel from "../../InputWithLabel/inputwithlabel"
import Logo from "../../../images/logo.svg"
import ArrowLeft from "../../../images/arrow-left.svg"
import Button from "../../Button/Button"
import "./registermentor.css"

const RegisterMentor = ({
    goBack,
    name,
    email,
    password,
    confirmPassword,
    type
}) => {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [phone, setPhone] = useState("");
    const [skill, setSkill] = useState("");
    const [desc, setDesc] = useState("");
    const [role, setRole] = useState("");
    const [policyTerms, setPolicyTerms] = useState(false);
    const [image, setImage] = useState(null);
    const [editImg, setEditImg] = useState(false);

    const changeTerms = () => {
        setPolicyTerms(!policyTerms);
    }

    const addSkill = (e) => {
        e.preventDefault();
        if (skill !== "") {
            setSkills([...skills, skill]);
            setSkill("");
        }
    }
    const deleteSkill = (e, index) => {
        e.preventDefault();
        const mySkills = skills.filter((skil, i) => (skil && i !== index));
        setSkills(mySkills);
    };

    const selectPicture = () => {
        setEditImg(!editImg);
    };

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
            setEditImg(false);
        }
    };

    useEffect(() => {
        if (image === null) {
            fetch(Logo)
                .then(res => res.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setImage(reader.result);
                        console.log(typeof (e).target.result, " This is the type Logo picture to be uploaded");
                    };
                    reader.readAsDataURL(blob);
                });
        }
    }, []);


    const mentorRegister = async (e) => {
        e.preventDefault();
        if (policyTerms) {


            try {
                console.log("second step");
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        confirmPassword,
                        type,
                        role,
                        phone,
                        skills,
                        desc,
                        image
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(`${errorData.message}`)
                    throw new Error(errorData.message || "Registration failed");
                }
                const responseData = await response.json();
                console.log("third step: ", responseData);
                navigate("/login");

            } catch (error) {
                console.log("This is the error: ", error.message);
            }
        } else {
            alert("Please accept terms and conditions!");
        };

    };

    return (
        <div className="mentor-register">
            <div className="backwards-button">
                <Button
                    img_src={ArrowLeft}
                    name={"Back"}
                    width={"150px"}
                    mySubmit={goBack}
                />
            </div>
            <h2>SETUP MENTOR ACCOUNT</h2>

            <div className="select-photo">
                {editImg ?
                    <div className="photo-select-input-mentor">
                        <input type="file" onChange={handleImageUpload} />
                    </div> : null
                }
                <PhotoSelection photo={image} selectPicture={selectPicture} />
            </div>

            <form className="mentor-register-form">

                <InputWithLabel
                    value={phone}
                    style={{
                        width: "100%"
                    }}
                    label="Phone number*"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="xxx-xxx-xxx"
                    required
                />
                <InputWithLabel
                    value={role}
                    style={{
                        width: "100%"
                    }}
                    label="Position*"
                    id="role"
                    onChange={(e) => setRole(e.target.value)}
                    type="text"
                    placeholder="Your position"
                    required
                />

                <div className="skills-section">
                    <InputWithLabel
                        value={skill}
                        label="Skill *"
                        id="Skill"
                        onChange={(e) => setSkill(e.target.value)}
                        type="text"
                        placeholder="Skill"
                        required={skills.length === 0}
                    />
                    <Button
                        name={"Add skill"}
                        width={"150px"}
                        mySubmit={(e) => { addSkill(e) }}
                    />
                </div>
                <div className="skills-display">
                    {skills.map((skil, index) => (
                        <p key={index}>{skil}
                            <button
                                onClick={(e) => deleteSkill(e, index)}
                            >  X</button>
                        </p>
                    ))}
                </div>
                <textarea
                    type="text"
                    name="description"
                    placeholder="Tell us some words about you"
                    id="description"
                    onChange={(e) => setDesc(e.target.value)}

                />

                <Button
                    name={"Register"}
                    width={"100%"}
                    disabled={!policyTerms}
                    type={"submit"}
                    mySubmit={(e) => { mentorRegister(e) }}
                />

                <div className="policyTerms">
                    <input
                        value={policyTerms}
                        id="policyTerms"
                        onChange={() => changeTerms()}
                        type="checkbox"
                    />
                    <span>By signing up to create an account I accept Company's <Link className="policyTermsConditions">Terms of use & Privacy Policy</Link>.</span>

                </div>
            </form>
        </div>
    )
}

export default RegisterMentor