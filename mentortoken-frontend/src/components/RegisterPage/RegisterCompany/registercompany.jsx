import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import ArrowLeft from "../../../images/arrow-left.svg"
import Button from "../../Button/Button";
import InputWithLabel from "../../InputWithLabel/inputwithlabel";
import PhotoSelection from "../PhotoSelection.jsx/photoselection.jsx"
import Logo from "../../../images/logo.svg"
import "./registercompany.css"

const RegisterCompany = ({
    goBack,
    name,
    email,
    password,
    confirmPassword,
    type
}) => {
    const navigate = useNavigate();
    const [representative, setRepresentative] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [policyTerms, setPolicyTerms] = useState(false);
    const [image, setImage] = useState(null);
    const [editImg, setEditImg] = useState(false);


    const changeTerms = () => {
        setPolicyTerms(!policyTerms);
    }

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
                    };
                    reader.readAsDataURL(blob);
                });
        }
    }, []);

    const companyRegister = async (e) => {
        e.preventDefault();
        if (policyTerms) {
            try {
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
                        phone,
                        representative,
                        address,
                        image
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert(`${errorData.message}`);
                    throw new Error(errorData.message || "Registration failed");
                }
                navigate("/login");
            } catch (error) {
                console.log("This is the error: ", error.message);
            }
        } else {
            alert("Please accept terms and conditions!");
        }

    };

    return (
        <div className="company-register">
            <div className="backwards-button">
                <Button
                    img_src={ArrowLeft}
                    name={"Back"}
                    width={"150px"}
                    mySubmit={goBack}
                />
            </div>
            <h2>SETUP COMPANY ACCOUNT</h2>

            <form className="company-form">

                <div className="select-photo-company">
                    <PhotoSelection photo={image} selectPicture={selectPicture} />
                </div>

                {editImg ?
                    <div className="photo-select-input-company">
                        <input type="file" onChange={handleImageUpload} />
                    </div> : null
                }

                <InputWithLabel
                    value={representative}
                    label="Legal Representative *"
                    id="Representative"
                    onChange={(e) => setRepresentative(e.target.value)}
                    type="text"
                    placeholder="Name and surname"
                    required
                />

                <InputWithLabel
                    value={address}
                    label="Registered Business Address *"
                    id="businessAddress"
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    placeholder="Registered Business Address"
                    required
                />

                <InputWithLabel
                    value={phone}
                    label="Phone number*"
                    id="phone"
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="xxx-xxx-xxx"
                    required
                />

                <Button
                    name={"Register"}
                    width={"100%"}
                    disabled={!policyTerms}
                    type={"submit"}
                    mySubmit={(e) => { companyRegister(e) }}
                />

                <div className="policyTerms">
                    <input
                        value={policyTerms}
                        id="policyTerms"
                        onChange={() => changeTerms()}
                        type="checkbox"
                    />

                    <span>By signing up to create an account I accept Company"s <Link className="policyTermsConditions">Terms of use & Privacy Policy</Link>.</span>

                </div>
            </form>
        </div>
    )
}

export default RegisterCompany